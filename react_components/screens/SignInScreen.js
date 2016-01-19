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

let SignInScreen = React.createClass({
    getInitialState() {
        return { authError: "Error" };
    },

    signIn() {
        // API call to sign user in
        console.log("User signed in!");
    },

    render() {
        return (
            <View>
                {
                  this.state.authError 
                    ? <Text style={styles.authError}>Signup Error</Text>
                    : null
                }
                <TextInput
                    autocorrect='false'
                    keyboardType='email-address'
                    placeholder='email'
                    style={ styles.inputField }
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email} />
                
                <TextInput
                    autocorrect='false'
                    secureTextEntry={true}
                    keyboardType='default'
                    placeholder='password'
                    style={ styles.inputField }
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password} />

                <TouchableOpacity onPress={this.signIn}>
                    <Text style={{color: 'black',textAlign: 'center'}}>Sign In</Text>
                </TouchableOpacity>              
            </View>
        )
    }
});

module.exports = SignInScreen;