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

    render() {
        let navigationBarHeight = 64, 
            sceneStyle = { paddingTop: navigationBarHeight },
            flexStyle = { flex: 1 };

        return (
            <View style={ flexStyle }>
                <ExNavigator
                    initialRoute={ Router.getRoute('Welcome') }
                    style={ flexStyle }
                    sceneStyle={ sceneStyle } />
            </View>
        )
    }
}

AppRegistry.registerComponent('AwesomeProject', () => Component);