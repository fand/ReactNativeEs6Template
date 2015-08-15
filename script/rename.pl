#!/usr/bin/env perl
use strict;
use warnings;
use utf8;

use Pod::Usage;
use List::Util;

my $after = $ARGV[0];
pod2usage() unless $after;

rename_project($after);

sub rename_project {
    my ($after) = @_;

    my $project_file = glob '*.xcodeproj';
    my $before = $project_file =~ s/(.*)\.xcodeproj/$1/r;

    print "Rename the project from '$before' to '$after'.\n\n";

    rename_texts($before, $after);
    rename_dirs($before, $after);
    rename_files($before, $after);

    print "\ndone.\n";
}

sub rename_texts {
    my ($before, $after) = @_;
    print "Rename the texts...\n";
    system "git grep -l $before | xargs sed -i '' -e 's/$before/$after/g'";
}

sub rename_dirs {
    my ($before, $after) = @_;
    print "Rename the dirs...\n";

    my $dirs_map = {};

    my @paths = map { chomp; $_ }`git ls-files | grep '$before'`;
    for my $path (@paths) {
        if ($path =~ qr{.*$before[^/]*/.*}) {
            my $dirname = $path =~ s{(.*$before[^/]*)/.*}{$1}r;
            $dirs_map->{$dirname} = 1;
        }
    }

    for my $dir (keys $dirs_map) {
        my $newdir = $dir =~ s/$before/$after/rg;
        print "\t'$dir' -> '$newdir'\n";
        system "git mv $dir $newdir";
    }
}

sub rename_files {
    my ($before, $after) = @_;
    print "Rename the files...\n";

    my @files = map { chomp; $_ } `git ls-files | grep '$before'`;
    for my $file (@files) {
        my $newfile = $file =~ s/$before/$after/rg;
        print "\t'$file' -> '$newfile'\n";
        system "git mv $file $newfile";
    }
}


__END__

=pod

=head1 NAME

rename.pl -- A script to rename the project.

=head1 SYNOPSIS

B<script.pl> NEW_PROJECT_NAME

=head1 DESCRIPTION

This script is testscript.

=cut
