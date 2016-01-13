'use strict';

var React = require('react-native');
var {
  ListView,
  Platform,
  StyleSheet,
  Text,
  View
} = React;

var ProfileVideoRecordingLink = require('../ProfileVideoRecordingLink');
var StudiesList = require('../StudiesList');

var StudiesScreen = React.createClass({
  getInitialState: function() {
    // API request here to see if user has already done profile video
    return {
      profileVideo: true
    };
  },
  render: function() {
    return (
      <View>
        { this.state.profileVideo ? <ProfileVideoRecordingLink /> : null }
        <StudiesList url={'current'} style={styles.container} />
        <StudiesList url={'other'} style={styles.container} />
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

module.exports = StudiesScreen;