'use strict';

let React = require('react-native'),
    Camera = require('react-native-camera'),
    Router = require('../Router'),
    MessageMap = require('../MessageMap'),    
    video = require('../api/video'),
    styles = require('../Styles');

let {
    Text,
    View,
    TouchableHighlight
} = React;

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
    submitVideo(event) {
        console.log('submitVideo in recording screen', event);
        var file = {};
        video.submit(file);        
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
                    <Text style={ styles.center }>{ MessageMap.buttons.switchCamera }</Text>
                </TouchableHighlight>

                <TouchableHighlight style={ styles.submitButton } onPress={ this.submitVideo }>
                    <Text style={ styles.center }>{ MessageMap.buttons.submitVideo }</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

module.exports = VideoRecordingScreen;