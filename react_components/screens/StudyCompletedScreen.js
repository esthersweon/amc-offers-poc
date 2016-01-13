'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');
var {
  ActivityIndicatorIOS,
  ListView,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight
} = React;

var StudyCompleteScreen = React.createClass({
  getInitialState: function() {
    return {
      price: {"number": 25, "currency": 'dollars'},
      waitTime: {"number": 1, "increment": 'day'},
      loaded: false
    }
  },
  componentWillMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    // API request that should give us a price for the salary
    var response = {
      "price": {"number": 15, "currency": 'dollars'},
      "waitTime": {"number": 3, "increment": 'days'}
    };

    this.setState({
      price: response.price, 
      waitTime: response.waitTime,
      loaded: true
    })
  },
	render: function() {
    var price = this.state.price.number + " " + this.state.price.currency;
    var waitTime = this.state.waitTime.number + " " + this.state.waitTime.increment;
		return (
			<View style={ styles.container }>
        <Text>That's all for this study! Thank you for your input.</Text>
        <Text>We'll send you {price} via PayPal in about {waitTime}.</Text>
        <Text>You may now start applying for studies and earning money for your opinions!</Text>
			</View>
		);
	}
});



var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});


module.exports = StudyCompleteScreen;