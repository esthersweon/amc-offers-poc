'use strict';

let React = require('react-native');
let Camera = require('react-native-camera');
let {
    ActivityIndicatorIOS,
    ListView,
    Platform,
    ProgressBarAndroid,
    Image,
    Text,
    View,
    TouchableHighlight,
    Animated,
    Dimensions
} = React;

let styles = require('../../Styles'),
    Router = require('../router'),
    LoginModal = require('./loginModal');

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

    render() {
        var component = this;
        return (
            <View style={styles.container}>
                <Text>MINDSWARMS</Text>
                <View style={ styles.postIt }>
                    <Text>Have an account?</Text> 
                    <TouchableHighlight onPress={this.openModal}>
                        <Text style={ styles.center }>Sign In</Text>
                    </TouchableHighlight>

                    <Text>Want to get paid for answer questions?</Text>
                    <TouchableHighlight onPress={function() {}}>
                        <Text style={ styles.center }>Sign Up</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={()=> Router.goTo('RecordVideo')}>
                        <Text style={ styles.center }>Record Video</Text>
                    </TouchableHighlight>
                </View>

                {
                    this.state.modal 
                        ? <LoginModal closeModal={() => this.setState({modal: false})}
                                signIn={() =>
                                  Router.goTo('Question')
                                }/>
                        : null
                }
            </View>
        );
    }
});

module.exports = WelcomeSplashScreen;