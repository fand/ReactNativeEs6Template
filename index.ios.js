/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

/**
 * For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
 * their very own API that lives in React Native's Github repo.
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var styles = StyleSheet.create({
  container : {
    flex            : 1,
    flexDirection   : 'row',
    justifyContent  : 'center',
    alignItems      : 'center',
    backgroundColor : '#F5FCFF',
  },
  thumbnail: {
    width  : 53,
    height : 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize     : 20,
    marginBottom : 8,
    textAlign    : 'center',
  },
  year : {
    textAlign : 'center',
  }
});

var AwesomeProject = React.createClass({
  getInitialState : function () {
    return {
      movies : null,
    };
  },
  componentDidMount: function () {
    this.fetchData();
  },
  fetchData: function () {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then((responseData) => {
        this.setState({
          movies:responseData.movies,
        });
      })
      .done();
  },
  render: function () {
    if (!this.state.movies) {
      return this.renderLoadingView();
    }
    var movie = this.state.movies[0];
    return this.renderMovie(movie);
  },
  renderLoadingView: function () {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  },
  renderMovie: function (movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
