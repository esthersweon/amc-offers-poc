'use strict';

let React = require('react-native'),
    Router = require('../Router'),
    styles = require('../Styles');

let {
    ListView,
    Image,
    Text,
    TextInput,
    ScrollView,
    View,
    TouchableOpacity,
    TouchableHighlight
} = React;

let SignUpScreen = React.createClass({
    getInitialState() {
        return { authError: null };
    },

    signUp() {
        // API call to create new user
        console.log("User created!");
    },

    render() {
        return (
            <ScrollView>
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
                        keyboardType='email-address'
                        placeholder='email'
                        style={ styles.inputField }
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email} />
                </View>

                <View>
                    <Text>
                        Last Name
                    </Text>

                    <TextInput
                        autocorrect='false'
                        keyboardType='email-address'
                        placeholder='email'
                        style={ styles.inputField }
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email} />
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
                        onChangeText={(email) => this.setState({email})}
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
                        onChangeText={(password) => this.setState({password})}
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
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password} />
                </View>
                
                <View>
                    <Text>
                        Country
                    </Text>
                    <TextInput
                        autocorrect='false'
                        keyboardType='email-address'
                        placeholder='email'
                        style={ styles.inputField }
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email} />
                </View>
                
                <View>
                    <Text>
                        ZIP Code / Postal Code
                    </Text>
                    <TextInput
                        autocorrect='false'
                        keyboardType='email-address'
                        placeholder='email'
                        style={ styles.inputField }
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email} />
                </View>

                
                <View>
                    <Text>
                        Gender
                    </Text>
                    <TextInput
                        autocorrect='false'
                        keyboardType='email-address'
                        placeholder='email'
                        style={ styles.inputField }
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email} />
                </View>
                <View>
                    <Text>
                        Birthdate
                    </Text>
                    <TextInput
                        autocorrect='false'
                        keyboardType='email-address'
                        placeholder='email'
                        style={ styles.inputField }
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email} />
                </View>
                <View>
                    <Text>
                        Phone Number
                    </Text>
                    <TextInput
                        autocorrect='false'
                        keyboardType='email-address'
                        placeholder='email'
                        style={ styles.inputField }
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email} />
                </View>

                <TouchableHighlight onPress={ Router.setRoute('TermsAndPrivacy') }>
                    <Text>
                        View Terms & Privacy Policy
                    </Text>
                </TouchableHighlight>

                <TouchableOpacity onPress={this.signUp}>
                    <Text style={{color: 'black',textAlign: 'center'}}>Sign Up</Text>
                </TouchableOpacity>              
            </ScrollView>
        )
    }
});

module.exports = SignUpScreen;