#!/usr/bin/env perl
use strict;
use warnings;
use utf8;

use Pod::Usage;

my $after = $ARGV[0];
pod2usage() unless $after;

rename_project($after);

sub rename_project {
    my ($after) = @_;

    my $project_file = glob '*.xcodeproj';
    my $before = $project_file =~ s/(.*)\.xcodeproj/$1/r;

    print "Rename the project from '$before' to '$after'.\n";

    rename_texts($before, $after);
    rename_files($before, $after);
}

sub rename_texts {
    my ($before, $after) = @_;
    print "Rename the texts from '$before' to '$after'.\n";
    system "git grep -l $before | xargs sed -i '' -e 's/$before/$after/g'";
}

sub rename_files {
    my ($before, $after) = @_;
    print "Rename the files from '$before' to '$after'.\n";

    my @dirs = qw(
        MyApp.xcodeproj
        MyAppTests
    );

    for my $dir (@dirs) {
        my $newdir = $dir =~ s/$before/$after/rg;
        print "Renaming directory '$dir' to '$newdir' ...\n";
        system "git mv $dir $newdir";
    }

    my @files = map {
        $after . $_;
    } qw(
        .xcodeproj/xcshareddata/xcschemes/MyApp.xcscheme
        Tests/MyAppTests.m
    );

    for my $file (@files) {
        my $newfile = $file =~ s/$before/$after/rg;
        print "Renaming file '$file' to '$newfile' ...\n";
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
