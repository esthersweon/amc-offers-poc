/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  BackAndroid,
  Navigator,
  StyleSheet,
  ToolbarAndroid,
  View,
  Text
} = React;

var HomeScreen = require('./react_components/HomeScreen');
var VideoScreen = require('./react_components/VideoScreen');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var routeMapper = function (route, navigator) {
  _navigator = navigator;
  if (route.name == 'home') {
    return(
        <HomeScreen 
            name={route.name}
            navigator={navigator}/>
    );
  } else if (route.name == 'video') {
    return(
        <View style={{flex: 1}}>
            <ToolbarAndroid
                actions={[]}
                onIconClicked={navigator.pop}
                style={styles.toolbar} />
            <VideoScreen
                style={{flex: 1}}
                name={route.name} />
        </View>
    );
  } else {
    return (
        <View>
            <Text>siosdh;FKHSDA;LHFK;LASH;KL</Text>
        </View>
    );
  }
};

var MindSwarmsApp = React.createClass({
    render: function() {
        // var initialRoute = {name: 'home'};
        // return (
        //   <Navigator
        //     style={styles.container}
        //     initialRoute={initialRoute}
        //     configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        //     renderScene={ routeMapper } />
        // );
        return <HomeScreen />
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    toolbar: {
        backgroundColor: '#a9a9a9',
        height: 56,
    }
});


AppRegistry.registerComponent('AwesomeProject', () => MindSwarmsApp);
