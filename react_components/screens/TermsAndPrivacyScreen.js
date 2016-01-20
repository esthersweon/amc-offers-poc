'use strict';

let React = require('react-native');
let {
    ListView,
    TouchableHighlight,
    Text,
    ScrollView,
    View
} = React;

let styles = require('../Styles');

let TermsAndPrivacyScreen = React.createClass({
    render() {
        return (
            <ScrollView>
                <Text>Text here.</Text>
            </ScrollView>
        );
    }
});

module.exports = TermsAndPrivacyScreen;