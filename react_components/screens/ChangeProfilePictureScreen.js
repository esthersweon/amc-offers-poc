'use strict';

let React = require('react-native'),
    Router = require('../Router'),
    styles = require('../Styles'),
    auth = require('../api/auth');

let {
    ListView,
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} = React;

let ChangeProfilePictureScreen = React.createClass({
    getInitialState() {
        return { authError: "Password is not long enough." };
    },

    sendPasswordResetEmail() {
        // API call to sign user in
        console.log("New password set!");
    },

    signOut() {
        auth.signOut();
        Router.getRoute('Welcome')
    },

    render() {
        return (
            <View>

                <Text>Change Profile Picture</Text>

            </View>
        )
    }
});

module.exports = ChangeProfilePictureScreen;