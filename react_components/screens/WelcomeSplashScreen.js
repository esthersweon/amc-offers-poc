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

let WelcomeSplashScreen = React.createClass({
    getInitialState() {
        return {
            offset: new Animated.Value(-deviceHeight),
            modal: false
        };
    },

    componentDidMount() {
        // Set navigator to router
        Router.setNavigator(this.props.navigator);

        auth.loggedIn()
            .then((session)=> this.setState({ loggedIn: session }));

        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    },

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
            //toValue: deviceHeight
        }).start(this.props.closeModal);
    },

    openModal() {
        console.log("Hello from Open Modal");
        this.setState({modal: true});
    }, 

    signIn(session) {
        this.setState({ loggedIn: session });

        console.log('CURRENT STATE : ',this.state);
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
                <Text>MINDSWARMS</Text>
                {
                    !this.state.loggedIn
                        ? <View style={ styles.postIt }>
                            <Text>Have an account?</Text> 
                            <TouchableHighlight onPress={this.openModal}>
                                <Text style={ styles.center }>Sign In</Text>
                            </TouchableHighlight>

                            <Text>Want to get paid for answer questions?</Text>
                            <TouchableHighlight onPress={ Router.setRoute('SignUp') }>
                                <Text style={ styles.center }>Sign Up</Text>
                            </TouchableHighlight>

                        </View>
                        : null
                }
                <View style={ styles.postIt }>
                    <TouchableHighlight onPress={ Router.setRoute('RecordVideo') }>
                        <Text style={ styles.center }>Record Video</Text>
                    </TouchableHighlight>
                </View>
                {
                    this.state.modal 
                        ? <LoginModal closeModal={() => this.setState({modal: false})}
                                signIn={ this.signIn }/>
                        : null
                }
            </View>
        );
    }
});

module.exports = WelcomeSplashScreen;