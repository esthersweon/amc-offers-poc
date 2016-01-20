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

let NewPasswordScreen = React.createClass({
    getInitialState() {
        return { authError: "Password is not long enough." };
    },

    sendPasswordResetEmail() {
        // API call to sign user in
        console.log("New password set!");
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
                    <Text>New Password</Text>
                    <TextInput
                        autocorrect='false'
                        keyboardType='password'
                        placeholder='password'
                        style={ styles.inputField }
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password} />
                </View>
                <View>
                    <Text>Confirm New Password</Text>
                    <TextInput
                        autocorrect='false'
                        keyboardType='password'
                        placeholder='password'
                        style={ styles.inputField }
                        onChangeText={(password) => this.setState({passwordConfirmation})}
                        value={this.state.passwordConfirmation} />
                </View>

                <TouchableOpacity onPress={this.sendPasswordResetEmail}>
                    <Text style={{color: 'black',textAlign: 'center'}}>Send</Text>
                </TouchableOpacity>              
            </View>
        )
    }
});

module.exports = NewPasswordScreen;