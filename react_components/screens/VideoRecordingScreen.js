'use strict';

let React = require('react-native');
let Camera = require('react-native-camera');
let {
    Text,
    View,
    TouchableHighlight
} = React;

import Router from '../Router';

let styles = require('../Styles');
let RecordButtonTexts = {
    RECORDING_STOPPED: 'Record',
    RECORDING_STARTED: 'Stop'
 };

let VideoRecordingScreen = React.createClass({
    getInitialState() {
        return {
            recordingMsg: 'RECORDING_STOPPED',
            type: Camera.constants.Type.front
        };
    },
    switchCamera() {
        this.setState({ type: this.state.type === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back });
    },
    onCaptureButtonPress() {
        this.refs.cam.captureVideo({ sampleSize: 10 }).then((recordingMsg)=> {
            this.setState({ recordingMsg });
        });
    },
    render() {
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

                <TouchableHighlight style={ styles.switchButton } onPress={ this.switchCamera }>
                    <Text style={ styles.center }>Switch</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

export default VideoRecordingScreen;