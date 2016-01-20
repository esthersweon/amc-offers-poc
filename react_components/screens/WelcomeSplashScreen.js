'use strict';

let React = require('react-native'),
    Router = require('../Router'),
    auth = require('../api/auth'),
    styles = require('../Styles');

let {
    Text,
    View,
    TouchableHighlight,
    Animated,
    Dimensions
} = React;

let {
    height: deviceHeight
} = Dimensions.get('window');

let WelcomeSplashScreen = React.createClass({
    getInitialState() {
        return {
            offset: new Animated.Value(-deviceHeight)
        };
    },

    componentDidMount() {
        // Set navigator to router
        Router.setNavigator(this.props.navigator);

        console.log('componentDidMount')

        auth.loggedIn()
            .then((session)=> this.setState({ loggedIn: session }));

        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    },

    signOut() {
        auth.signOut();
        this.setState({ loggedIn: null });
    },

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight  style={ styles.signOut } onPress={ this.signOut }>
                    <Text>Sign Out</Text>
                </TouchableHighlight>
                <Text>mindswarms</Text>
                <View style={ styles.postIt }>
                    {
                        !this.state.loggedIn
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
                        <TouchableHighlight onPress={ Router.setRoute('Account') }>
                            <Text style={ styles.center }>Account</Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={ Router.setRoute('RecordVideo') }>
                            <Text style={ styles.center }>Record Video</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = WelcomeSplashScreen;