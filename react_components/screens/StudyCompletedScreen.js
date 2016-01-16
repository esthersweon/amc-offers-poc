'use strict';

let React = require('react-native');
let {
    ActivityIndicatorIOS,
    ListView,
    Platform,
    ProgressBarAndroid,
    Image,
    Text,
    View,
    TouchableHighlight
} = React;

let styles = require('../Styles');

let StudyCompleteScreen = React.createClass({
    getInitialState() {
        return {
            price: {"number": 25, "currency": 'dollars'},
            waitTime: {"number": 1, "increment": 'day'},
            loaded: false
        }
    },

    componentWillMount() {
        this.fetchData();
    },

    fetchData() {
        // API request that should give us a price for the salary
        let response = {
            "price": {"number": 15, "currency": 'dollars'},
            "waitTime": {"number": 3, "increment": 'days'}
        };
    
        this.setState({
            price: response.price, 
            waitTime: response.waitTime,
            loaded: true
        })
    },

    render() {
        let price = this.state.price.number + " " + this.state.price.currency,
            waitTime = this.state.waitTime.number + " " + this.state.waitTime.increment;
        return (
            <View style={ styles.container }>
                <Text>That's all for this study! Thank you for your input.</Text>
                <Text>We'll send you {price} via PayPal in about {waitTime}.</Text>
                <Text>You may now start applying for studies and earning money for your opinions!</Text>
            </View>
        );
    }
});

module.exports = StudyCompleteScreen;