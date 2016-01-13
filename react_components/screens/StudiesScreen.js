'use strict';

var React = require('react-native');
var {
  ListView,
  Platform,
  Text,
  View
} = React;

var styles = require('../../Styles');

var ProfileVideoRecordingLink = require('../ProfileVideoRecordingLink'),
    StudiesList = require('../StudiesList');

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

module.exports = StudiesScreen;