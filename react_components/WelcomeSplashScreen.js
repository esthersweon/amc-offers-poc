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


var WelcomeSplashScreen = React.createClass({
    render: function() {
        var component = this;
        return (
            <View style={styles.container}>
                <Text>MINDSWARMS</Text>
                <View style={ styles.postIt }>
                    <Text>Have an account?</Text>
                    <TouchableHighlight onPress={function() {}}>
                        <Text style={{textAlign: 'center'}}>Sign In</Text>
                    </TouchableHighlight>


                    <Text>Want to get paid for answer questions?</Text>
                    <TouchableHighlight onPress={function() {}}>
                        <Text style={{textAlign: 'center'}}>Sign Out</Text>
                    </TouchableHighlight>
                </View>
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
    }, 
    postIt: {
        backgroundColor: 'lightblue'
    }
});


module.exports = WelcomeSplashScreen;