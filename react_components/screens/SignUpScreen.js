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
                        onChangeText={(first_name) => this.state.consumer.first_name = first_name}
                        value={this.state.first_name} />
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
                        onChangeText={(last_name) => this.state.consumer.last_name =  last_name }
                        value={this.state.last_name} />
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
                        onChangeText={(email) => this.state.consumer.email = email}
                        value={this.state.email} />
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
                        onChangeText={(password) => this.state.consumer.password = password}
                        value={this.state.password} />
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
                        onChangeText={(password) => this.state.consumer.password_confirmation = password}
                        value={this.state.password_confirmation} />
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