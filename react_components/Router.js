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
let RouteMap = {
    Home: {
        sceneClass: () => require('./screens/WelcomeSplashScreen'),
        title: 'Welcome'
    },
    SignUp: {
        sceneClass: () => require('./screens/SignUpScreen'),
        title: 'Sign Up'
    },
    RecordVideo: {
        sceneClass: () => require('./screens/VideoRecordingScreen'),
        title: 'Record Video',
        protected: true
    },
    Questions: {
        sceneClass: () => require('./screens/QuestionScreen'),
        title: 'Questions',
        protected: true
    }
};

let Router = {
    routes: {
        // routes requiring more customization defined here
        // DOCS: https://github.com/exponentjs/ex-navigator
    },

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

    setRoute(route) {
        return () => this.goTo(route);
    },

    // get object representing route
    getRoute(route) {
        if (typeof this.routes[route] !== 'function') {
            route = 'Home';
        }

        return this.routes[route].apply(this, arguments);
    },
};

// Syntactic sugar for generic routes defined in RouteMap
for (let route in RouteMap) {
    if (!Router.routes[route]) {
        Router.routes[route] = ()=> {
            return {
                protected: Router.routes[route].protected,

                getSceneClass() {
                    return RouteMap[route].sceneClass();
                },

                getTitle() {
                    return RouteMap[route].title;
                }
            }
        }
    }
}

module.exports = Router;
