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
            capturedBase64: '',
            recordingMsg: 'RECORDING_STOPPED',
            type: Camera.constants.Type.back
        });
    },
    switchCamera: function() {
        this.setState({ type: this.state.type === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back });
    },
    render: function() {
        var component = this;
        return (
            <View style={styles.container}>
                <Camera style={styles.camera} ref="cam" type={this.state.type} captureTarget={Camera.constants.CaptureTarget.memory}></Camera>
                <Image
                    source={{
                        isStatic: true,
                        uri: 'data:image/jpeg;base64,' + component.state.capturedBase64,
                    }}
                    style={styles.captured}/>

                <TouchableHighlight style={styles.captureButton} onPress={function() {
                    component.refs.cam.captureVideo({ sampleSize: 10 }).then(function(recordingMsg) {
                        component.setState({ recordingMsg });
                    });
                }}>
                    <Text style={{textAlign: 'center'}}>{ RecordButtonTexts[component.state.recordingMsg] }</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

module.exports = VideoRecordingScreen;