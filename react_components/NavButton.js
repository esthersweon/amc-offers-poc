'use strict';

let React = require('react-native');
let {
    TouchableHighlight,
    Text
} = React;

let styles = require('./Styles');

let NavButton = React.createClass({
    render() {
        return(
            <TouchableHighlight 
                onPress={() => { this.props.navigator.pop() }}
                style={ styles.backButton }
                underlayColor="transparent">
                
                <Text style={ styles.backButtonText }>
                    { this.props.labelText }
                </Text>
            </TouchableHighlight>
        );
    }
});

module.exports = NavButton;