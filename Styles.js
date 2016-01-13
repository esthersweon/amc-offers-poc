'use strict';

var React = require('react-native');
var { StyleSheet } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    toolbar: {
        backgroundColor: '#a9a9a9',
        height: 56,
    }, 
    listView: {
      paddingTop: 20,
      backgroundColor: '#F5FCFF',
    }, 
    postIt: {
        backgroundColor: 'lightblue'
    },
    // VideoRecordingScreen
    camera: {
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0
    },
    captured: {
        width: 200,
        height: 400
    },
    captureButton: {
        position: 'absolute',
        height: 50,
        left: 150, bottom: 20, right: 150,
        backgroundColor: 'red',
        borderRadius: 20,
    },
    switchButton: {
        position: 'absolute',
        height: 50,
        left: 50, top: 20, right: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    }
});

module.exports = Styles;