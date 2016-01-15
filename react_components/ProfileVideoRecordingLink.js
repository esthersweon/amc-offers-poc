'use strict';

let React = require('react-native');
let Camera = require('react-native-camera');
let {
  Text,
  TouchableHighlight
} = React;

let styles = require('./Styles'), 
    Router = require('./Router');

let ProfileVideoRecordingLink = React.createClass({
	render() {
		return (
			<TouchableHighlight onPress={()=> Router.goTo('RecordVideo')}>
                <Text style={ styles.center }>Record Video</Text>
            </TouchableHighlight>
		);
	}
});

module.exports = ProfileVideoRecordingLink;