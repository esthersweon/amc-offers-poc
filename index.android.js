/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

let React = require('react-native');
let {
    AppRegistry,
    BackAndroid,
    Navigator,
    StyleSheet,
    ToolbarAndroid,
    View,
    Text
} = React;

import ExNavigator from '@exponent/react-native-navigator';
import Router from './react_components/Router';
let styles = require('./react_components/Styles');

class Component extends  React.Component {
    constructor(props){
        super(props)
    }

    openModal() {
        console.log("Hello from Open Modal");
        this.setState({modal: true})
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <ExNavigator
                    initialRoute={Router.getRoute('Home')}
                    style={{ flex: 1 }}
                    sceneStyle={{ paddingTop: 64 }} />
            
            </View>
        )
    }
}

AppRegistry.registerComponent('AwesomeProject', () => Component);