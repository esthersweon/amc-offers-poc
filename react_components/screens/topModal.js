'use strict';

var React = require('react-native');

var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Animated,
  Dimensions
} = React;

var {
  height: deviceHeight
} = Dimensions.get('window');

var topModal = React.createClass({
    getInitialState: function() {
        return {
            offset: new Animated.Value(-deviceHeight)
          //  offset: new Animated.Value(deviceHeight)
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
        }).start(()=>{
            this.props.closeModal();
            this.props.signedIn()
        });
    },

    render: function() {
        return (
          <Animated.View style={[styles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset}]}]}>
            <TouchableOpacity onPress={this.closeModal}>
              <Text style={{color: '#FFF',textAlign: 'center'}}>Sign In Flow!</Text>
            </TouchableOpacity>
          </Animated.View>
        )
    }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});


module.exports = topModal