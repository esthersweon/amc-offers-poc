'use strict';

let React = require('react-native'),
    Router = require('../Router'),
    styles = require('../Styles');

let {
    ListView,
    Image,
    Text,
    View,
    TouchableHighlight
} = React;

let SignUpScreen = React.createClass({
    getInitialState() {
        return { authError: "Error" };
    },

    signUp() {
        // API call to create new user
        console.log("User created!");
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

                <TouchableOpacity onPress={this.signUp}>
                    <Text style={{color: 'black',textAlign: 'center'}}>Sign Up</Text>
                </TouchableOpacity>              
            </View>
        )
    }
});

module.exports = SignUpScreen;