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
        //       https://github.com/Thorbenandresen/ExNavigatorExample/blob/master/app/router.js
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
    let currentRoute = RouteMap[route];

    if (!Router.routes[route]) {
        Router.routes[route] = ()=> {
            return {
                protected: currentRoute.protected,

                // You can render arbitrary views for the title component. Note that you
                // also need to implement getTitle if you want the title of this route to
                // show up in the back button to it.
                renderTitle() {
                    return (
                        <View style={styles.title}>
                            <Text style={styles.titleName}>{currentRoute.title}</Text>
                        </View>
                    );
                },
                renderRightButton() {
                    return (
                        <Text onPress={() => { console.log('Tapped right button'); }}>
                            Log
                        </Text>
                    );
                },
                getSceneClass() {
                    return currentRoute.sceneClass();
                },

                getTitle() {
                    return currentRoute.title;
                }
            }
        }
    }
}

module.exports = Router;
