'use strict';

let React = require('react-native'),
    Router = require('../Router'),
    styles = require('../Styles'),
    auth = require('../api/auth');

let {
    Text,
    Switch,
    View,
    TouchableOpacity
} = React;

let BottomNavBar = require('../BottomNavBar');

let AccountScreen = React.createClass({
    getInitialState() {
        return { authError: "Password is not long enough." };
    },

    sendPasswordResetEmail() {
        // API call to sign user in
        console.log("New password set!");
    },

    signOut() {
        auth.signOut();
        // this.setState somewhere to set state as { loggedIn: false }
        Router.setRoute('Welcome')
    },

    render() {
        return (
            <View>
                <View>
                    <TouchableOpacity onPress={Router.setRoute('EditAccount')}>
                        <Text>Edit Account</Text>
                    </TouchableOpacity>  

                    <TouchableOpacity onPress={Router.setRoute('ChangeProfilePicture')}>
                        <Text>Change Profile Picture</Text>
                    </TouchableOpacity>  

                    <TouchableOpacity onPress={ this.signOut }>
                        <Text>Sign Out</Text>
                    </TouchableOpacity>

                    <View>
                        <Text>Upload on Cellular</Text>
                        <Switch />
                    </View>
                </View>
                <BottomNavBar/>
            </View>
        )
    }
});

module.exports = AccountScreen;