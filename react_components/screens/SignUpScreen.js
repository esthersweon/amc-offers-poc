'use strict';

let React = require('react-native'),
    Router = require('../Router'),
    auth = require('../api/auth'),
    styles = require('../Styles');

let {
    ListView,
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} = React;

let SignUpScreen = React.createClass({
    getInitialState() {
        return {
            consumer: {},
            authError: null
        };
    },

    signUp() {
        let credentials = { consumer: this.state.consumer };
        console.log('consumer!', credentials);

        auth
            .signUp(credentials)
            .then((result) => {
                console.log("User created!", result);
                Router.goTo('Questions');
            }, (err) => {
                console.log('AUTH ERROR', err);
                this.setState({ authError: true });
            });  
    },

    render() {
        let consumer = this.state.consumer;
        return (
            <View>
                {
                  this.state.authError 
                    ? <Text style={styles.authError}>Signup Error</Text>
                    : null
                }

                <View>
                    <Text>
                        First Name
                    </Text>
                    
                    <TextInput
                        autocorrect='false'
                        keyboardType='default'
                        placeholder='First Name'
                        style={ styles.inputField }
                        onChangeText={ (first_name) => consumer.first_name = first_name }
                        value={ consumer.first_name } />
                </View>

                <View>
                    <Text>
                        Last Name
                    </Text>

                    <TextInput
                        autocorrect='false'
                        keyboardType='default'
                        placeholder='Last Name'
                        style={ styles.inputField }
                        onChangeText={ (last_name) => consumer.last_name =  last_name }
                        value={ consumer.last_name } />
                </View>

                <View>
                    <Text>
                        Email Address
                    </Text>
                    <TextInput
                        autocorrect='false'
                        keyboardType='email-address'
                        placeholder='email'
                        style={ styles.inputField }
                        onChangeText={ (email) => consumer.email = email }
                        value={ consumer.email } />
                </View>

                <View>
                    <Text>
                        Password
                    </Text>
                    <TextInput
                        autocorrect='false'
                        secureTextEntry={true}
                        keyboardType='default'
                        placeholder='password'
                        style={ styles.inputField }
                        onChangeText={ (password) => consumer.password = password }
                        value={ consumer.password } />
                </View>

                <View>
                    <Text>
                        Password Confirmation
                    </Text>
                    <TextInput
                        autocorrect='false'
                        secureTextEntry={true}
                        keyboardType='default'
                        placeholder='password'
                        style={ styles.inputField }
                        onChangeText={ (password) => consumer.password_confirmation = password }
                        value={ consumer.password_confirmation } />
                </View>

                <View>
                    <Text>
                        View Terms & Privacy Policy
                    </Text>
                </View>

                <TouchableOpacity onPress={this.signUp}>
                    <Text style={{color: 'black',textAlign: 'center'}}>Sign Up</Text>
                </TouchableOpacity>              
            </View>
        )
    }
});

module.exports = SignUpScreen;