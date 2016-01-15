'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');
var {
  ActivityIndicatorIOS,
  ListView,
  Platform,
  ProgressBarAndroid,
  Image,
  Text,
  View,
  TouchableHighlight
} = React;

var styles = require('./Styles');

var ProfileVideoRecordingLink = React.createClass({
	render: function() {
		return (
			<View style={ styles.container }>
				<Text>Record your video!</Text>
			</View>
		);
	}
});

module.exports = ProfileVideoRecordingLink;