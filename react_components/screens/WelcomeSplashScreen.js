'use strict';

let React = require('react-native'),
    Router = require('../Router'),
    auth = require('../api/auth'),
    styles = require('../Styles'),
    LoginModal = require('./LoginModal');

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

let WelcomePostIt = require('../WelcomePostIt');

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
                <WelcomePostIt 
                    loggedIn={ this.state.loggedIn } />
            </View>
        );
    }
});

module.exports = WelcomeSplashScreen;