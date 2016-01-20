'use strict';

let React = require('react-native'),
    auth = require('../api/auth'),
    Router = require('../Router'),
    MessageMap = require('../MessageMap'),
    styles = require('../Styles');

let {
    ListView,
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity
} = React;

let SignInScreen = React.createClass({
    getInitialState() {
        return { authError: false };
    },

    signIn() {
        // API call to sign user in
        let credentials = {
          email: this.state.email,
          password: this.state.password
        };

        auth
            .signIn(credentials)
            .then((result) => {
                Router.goTo('Studies');
            }, (err) => {
                console.log('AUTH ERROR', err); // Error: "It broke"
                this.state.authError = true;
            });        
    },

    render() {
        return (
            <View>
                {
                  this.state.authError 
                    ? <Text style={styles.authError}>{ MessageMap.errors.signIn }</Text>
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

                <View>
                    <TouchableOpacity onPress={this.signIn}>
                        <Text style={{color: 'black',textAlign: 'center'}}>{ MessageMap.buttons.signIn }</Text>
                    </TouchableOpacity>
                </View>  

                <View>
                    <TouchableOpacity onPress={ Router.setRoute('PasswordReset') }>
                        <Text style={ styles.center }>{ MessageMap.buttons.resetPassword }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
});

module.exports = SignInScreen;