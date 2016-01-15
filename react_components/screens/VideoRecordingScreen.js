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
var RecordButtonTexts = {
    RECORDING_STOPPED: 'Record',
    RECORDING_STARTED: 'Stop'
 };

var VideoRecordingScreen = React.createClass({
    getInitialState: function() {
        return ({
            recordingMsg: 'RECORDING_STOPPED',
            type: Camera.constants.Type.back
        });
    },
    switchCamera: function() {
        this.setState({ type: this.state.type === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back });
    },
    onCaptureButtonPress: function() {
        var component = this;
        this.refs.cam.captureVideo({ sampleSize: 10 }).then(function(recordingMsg) {
            component.setState({ recordingMsg });
        });
    },
    render: function() {
        return (
            <View style={ styles.container }>
                <Camera ref="cam" 
                    style={ styles.camera } 
                    type={ this.state.type } 
                    directory={ "MindSwarms" } 
                    captureTarget={ Camera.constants.CaptureTarget.memory } />
                <Text style={ styles.videoPrompt }>{ this.props.prompt }</Text>

                <TouchableHighlight style={ styles.captureButton } onPress={ this.onCaptureButtonPress }>
                    <Text style={ styles.center }>{ RecordButtonTexts[this.state.recordingMsg] }</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

module.exports = VideoRecordingScreen;