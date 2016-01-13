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

var styles = require('./Styles'),
    WelcomeSplashScreen = require('./react_components/screens/WelcomeSplashScreen'),
    StudiesScreen = require('./react_components/screens/StudiesScreen'),
    QuestionScreen = require('./react_components/screens/QuestionScreen'),
    VideoRecordingScreen = require('./react_components/screens/VideoRecordingScreen'), 
    StudyCompletedScreen = require('./react_components/screens/StudyCompletedScreen');

// var _navigator;
// BackAndroid.addEventListener('hardwareBackPress', () => {
//   if (_navigator && _navigator.getCurrentRoutes().length > 1) {
//     _navigator.pop();
//     return true;
//   }
//   return false;
// });

// var routeMapper = function (route, navigator) {
//   _navigator = navigator;
//   if (route.name == 'home') {
//     return(
//         <StudiesScreen 
//             name={route.name}
//             navigator={navigator}/>
//     );
//   } else if (route.name == 'video') {
//     return(
//         <View style={{flex: 1}}>
//             <ToolbarAndroid
//                 actions={[]}
//                 onIconClicked={navigator.pop}
//                 style={styles.toolbar} />
//             <VideoRecordingScreen
//                 style={{flex: 1}}
//                 name={route.name} />
//         </View>
//     );
//   } else {
//     return (
//         <View>
//             <Text>MindSwarms App is not working properly.</Text>
//         </View>
//     );
//   }
// };

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
        return <WelcomeSplashScreen />
    }
});

AppRegistry.registerComponent('AwesomeProject', () => MindSwarmsApp);
