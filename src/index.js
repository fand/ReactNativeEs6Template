/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
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
    backgroundColor : '#EEF',
  },
  containerEven : {
    flex            : 1,
    flexDirection   : 'row',
    justifyContent  : 'center',
    alignItems      : 'center',
    backgroundColor : '#FFFFFF',
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
  },
  listView: {
    paddingTop      : 20,
    backgroundColor : '#F5FCFF',
  }
});

var AwesomeProject = React.createClass({
  getInitialState : function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) =>  row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function () {
    this.fetchData();
  },
  fetchData: function () {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },
  render: function () {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  },
  renderLoadingView: function () {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  },
  renderMovie: function (movie, _, i) {
    return (
      <View style={i % 2 ? styles.container : styles.containerEven}>
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
