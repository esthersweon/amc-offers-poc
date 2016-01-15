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
  TouchableHighlight,
  Animated,
  Dimensions
} = React;

var styles = require('../../Styles'),
    Router = require('../router'),
    TopModal = require('./topModal');

var {
  height: deviceHeight
} = Dimensions.get('window');


var WelcomeSplashScreen = React.createClass({
    getInitialState: function() {
      return {
        offset: new Animated.Value(-deviceHeight),
        modal: false
      };
    },
    componentDidMount: function() {
      Animated.timing(this.state.offset, {
        duration: 150,
        toValue: 0
      }).start();
    },

    closeModal: function() {
      Animated.timing(this.state.offset, {
        duration: 150,
        toValue: -deviceHeight
        //toValue: deviceHeight
      }).start(this.props.closeModal);
    },

    openModal: function() {
      console.log("Hello from Open Modal");
      this.setState({modal: true})
    }, 

    render: function() {
        var component = this;
        return (
            <View style={styles.container}>
                <Text>MINDSWARMS</Text>
                <View style={ styles.postIt }>
                    <Text>Have an account?</Text>
                    <TouchableHighlight onPress={this.openModal}>
                        <Text style={ styles.center }>Sign In</Text>
                    </TouchableHighlight>

                    <Text>Want to get paid for answer questions?</Text>
                    <TouchableHighlight onPress={function() {}}>
                        <Text style={ styles.center }>Sign Out</Text>
                    </TouchableHighlight>
                </View>

                {
                  this.state.modal 
                    ? <TopModal closeModal={() => this.setState({modal: false})}
                                signedIn={() =>
                                  this.props.navigator.push(Router.getRoute('Question'))
                                }/>
                    : null
                }
            </View>
        );
    }
});

module.exports = WelcomeSplashScreen;