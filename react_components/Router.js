'use strict';

let React = require('react-native');
let styles = require('./Styles');
let {
    View,
    Text,
    Image,
    TouchableHighlight
} = React;

let navigator;

// basic routes, requiring no customization, 
// can be defined here
import Welcome from './screens/WelcomeSplashScreen';
import VideoRecording from './screens/VideoRecordingScreen';
import Questions from './screens/QuestionScreen';

let RouteMap = {
    Home: {
        file: Welcome,
        title: 'Welcome'
    },
    RecordVideo: {
        file: VideoRecording,
        title: 'Record Video'
    },
    Questions: {
        file: Questions,
        title: 'Questions'
    }
}

let Router = {
    // set navigator based on screen (syntactic sugar)
    setNavigator(_navigator) {
        if (!navigator) {
            navigator = _navigator;
        }
    },

    // go to a route (syntactic sugar)
    goTo(route) {
        navigator.push(Router.getRoute(route));
    },

    // get object representing route
    getRoute(route) {
        if (typeof this.routes[route] !== 'function') {
            route = 'Home';
        }

        return this.routes[route].apply(this, arguments);
    },
    routes: {
        // routes requiring more customization defined here
        // DOCS: https://github.com/exponentjs/ex-navigator
    }    
};

// Syntactic sugar for generic routes defined in RouteMap
for (let route in RouteMap) {
    if (!Router.routes[route]) {
        Router.routes[route] = ()=> {
            return {
                getSceneClass() {
                    return RouteMap[route].file;
                },

                getTitle() {
                    return RouteMap[route].title;
                }
            }
        }
    }
}

console.log('Router', Router)

export default Router;