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

var ProfileVideoRecordingLink = React.createClass({
	render: function() {
		return (
			<View>
				<Text>Record your video!</Text>
			</View>
		);
	}
});

module.exports = ProfileVideoRecordingLink;