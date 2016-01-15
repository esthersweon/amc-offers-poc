'use strict';

let React = require('react-native');
let {
    ListView,
    Platform,
    Text,
    View
} = React;

let styles = require('../Styles');

let ProfileVideoRecordingLink = require('../ProfileVideoRecordingLink'),
    StudiesList = require('../StudiesList');

let StudiesScreen = React.createClass({
    getInitialState() {
        // API request here to see if user has already done profile video
        return {
            profileVideo: true
        };
    },
    render() {
        return (
            <View>
                { this.state.profileVideo ? <ProfileVideoRecordingLink /> : null }
                <StudiesList url={'current'} style={styles.container} />
                <StudiesList url={'other'} style={styles.container} />
            </View>
        );
    }
});

module.exports = StudiesScreen;