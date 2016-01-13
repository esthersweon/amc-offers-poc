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

var VideoRecordingScreen = React.createClass({
    getInitialState: function() {
        return ({
            capturedBase64: '',
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
                <Text>{ this.props.prompt }</Text>

                <Camera style={styles.camera} ref="cam" type={this.state.type} captureTarget={Camera.constants.CaptureTarget.memory}></Camera>
                <Image
                    source={{
                        isStatic: true,
                        uri: 'data:image/jpeg;base64,' + component.state.capturedBase64,
                    }}
                    style={styles.captured}/>

                <TouchableHighlight style={styles.captureButton} onPress={function() {
                    component.refs.cam.capture({ sampleSize: 10 }).then(function(capturedBase64) {
                        component.setState({ capturedBase64 });
                        setTimeout(() => component.setState({ capturedBase64: '' }), 5000);
                    });
                }}>
                    <Text style={{textAlign: 'center'}}>Capture</Text>
                </TouchableHighlight>


                <TouchableHighlight style={styles.switchButton} onPress={this.switchCamera}>
                    <Text style={{textAlign: 'center'}}>Switch</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

module.exports = VideoRecordingScreen;