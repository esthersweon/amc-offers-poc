'use strict';

let React = require('react-native'),
    Router = require('../Router'),
    styles = require('../Styles');

let {
    ListView,
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} = React;

let ResetPasswordScreen = React.createClass({
    getInitialState() {
        return { authError: "Email does not exist." };
    },

    sendPasswordResetEmail() {
        // API call to sign user in
        console.log("Password reset email sent!");
    },

    render() {
        return (
            <View>
                {
                  this.state.authError 
                    ? <Text style={styles.authError}>{ this.state.authError }</Text>
                    : null
                }
                <View>
                    <Text>Email address</Text>
                    <TextInput
                        autocorrect='false'
                        keyboardType='email-address'
                        placeholder='email'
                        style={ styles.inputField }
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email} />
                </View>

                <TouchableOpacity onPress={this.sendPasswordResetEmail}>
                    <Text style={{color: 'black',textAlign: 'center'}}>Send</Text>
                </TouchableOpacity>              
            </View>
        )
    }
});

module.exports = ResetPasswordScreen;