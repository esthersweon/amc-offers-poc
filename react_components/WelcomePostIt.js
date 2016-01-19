'use strict';

let React = require('react-native'),
    Router = require('./Router');
let {
    View, 
    TouchableHighlight,
    Text
} = React;

let styles = require('./Styles');

let WelcomePostIt = React.createClass({
    render() {
        return(
            <View style={ styles.postIt }>
                {
                    !this.props.loggedIn
                        ? <View>
                            <Text>Have an account?</Text> 
                            <TouchableHighlight onPress={ Router.setRoute('SignIn') }>
                                <Text style={ styles.center }>Sign In</Text>
                            </TouchableHighlight>

                            <Text>Want to get paid for answer questions?</Text>
                            <TouchableHighlight onPress={ Router.setRoute('SignUp') }>
                                <Text style={ styles.center }>Sign Up</Text>
                            </TouchableHighlight>

                        </View>
                        : null
                }
                <View>
                    <TouchableHighlight onPress={ Router.setRoute('RecordVideo') }>
                        <Text style={ styles.center }>Record Video</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
});

module.exports = WelcomePostIt;
