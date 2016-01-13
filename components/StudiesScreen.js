'use strict';

var React = require('react-native');
var {
  ListView,
  Platform,
  StyleSheet,
  Text,
  View
} = React;

var StudiesList = require('./StudiesList');

var StudiesScreen = React.createClass({
  render: function() {
    return (
      <View>
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