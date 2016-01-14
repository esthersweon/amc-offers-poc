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

var styles = require('../../Styles');

var WelcomeSplashScreen = React.createClass({
    render: function() {
        var component = this;
        return (
            <View style={styles.container}>
                <Text>MINDSWARMS</Text>
                <View style={ styles.postIt }>
                    <Text>Have an account?</Text>
                    <TouchableHighlight onPress={function() {}}>
                        <Text style={ styles.center }>Sign In</Text>
                    </TouchableHighlight>

                    <Text>Want to get paid for answer questions?</Text>
                    <TouchableHighlight onPress={function() {}}>
                        <Text style={ styles.center }>Sign Out</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
});

module.exports = WelcomeSplashScreen;