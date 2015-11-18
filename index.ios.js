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
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;
var $ = require('jquery');

// Movie Fetch Request
var MOVIE_API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var MOVIE_API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var MOVIE_NUM_PAGES = 25;
var MOVIE_PARAMS = '?apikey=' + MOVIE_API_KEY + '&page_limit=' + MOVIE_NUM_PAGES;
var MOVIE_REQUEST_URL = MOVIE_API_URL + MOVIE_PARAMS;

// OOH Offer Trigger Post Request
var OOH_API_URL = '';
var OOH_API_KEY = '';
var OOH_PARAMS = '?apikey=' + OOH_API_KEY;
var OOH_POST_URL = OOH_API_URL + OOH_PARAMS;

var amcOffersDiscountOn = (clickedMovieId) => {

  // Mock AMC App DB
  var mockAmcDb = {
    couponMovies: [
      { id: 771360513, title: 'Spectre' },
      { id: 770807799, title: 'Goosebumps' },
      { id: 771321495, title: 'Hotel Transylvania 2' },
      { id: 771385978, title: 'The Last Witch Hunter' }
    ]
  };

  return mockAmcDb.couponMovies.map((movie) => movie.id).indexOf(Number(clickedMovieId)) >= 0
};

var AwesomeProject = React.createClass({
  watchID: (null: ?number),
  getInitialState: function() {
    return { 
      dataSource : new ListView.DataSource({
        rowHasChanged : (row1, row2) => row1 !== row2
      }), 
      loaded: false,
      initialPosition: 'unknown',
      lastPosition: 'unknown'
    };
  },
  fetchData: function() {
    fetch(MOVIE_REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true
        });
      })
      .done();
  },
  componentDidMount: function() {
    // get my location
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
    });

    this.fetchData();
  },
  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },
  postTriggerToOoh: function(movie) {
    var lastCoords = this.state.lastPosition.coords;

    // add UUID of phone
    var payload = {
      userLocation: { 
        lat: lastCoords.latitude,
        long: lastCoords.longitude
      },
      movieId: movie.id
    };

    // Check if AMC is offering discount on movie
    // This logic could technically live in OOH Offers
    if (amcOffersDiscountOn(movie.id)) {
      alert(JSON.stringify(payload));

      // // OOH OFFERS TRIGGER POST REQUEST
      // // 1. Look for movie theatres in my area specific to provider
      // // 2. Fetch coupon for that provider from db
      // // 3. Send a push notification to the user with the coupon
      // $.post(OOH_POST_URL, function(responseData) {
      //   alert(currentTarget + responseData);
      // });
    }

  },
  _onPressButton: function(movie) {
    this.postTriggerToOoh(movie);
  },
  renderLoading: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },
  renderMovie: function(movie) {
    return (
      <TouchableHighlight onPress={this._onPressButton.bind(null, movie)} style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{uri: movie.posters.thumbnail}}
            style={styles.thumbnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoading();
    }

    return (
      <ListView 
        dataSource={this.state.dataSource} 
        renderRow={this.renderMovie} 
        style={styles.listView} />
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
