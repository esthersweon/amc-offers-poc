'use strict';

let React = require('react-native');
let styles = require('./Styles');
let {
    View,
    Text,
    Image,
    TouchableHighlight
} = React;

let NavButton = require('./NavButton');
let navigator;

// basic routes, requiring no customization, 
// can be defined here
let RouteMap = {
    Welcome: {
        sceneClass: () => require('./screens/WelcomeSplashScreen'),
        title: ''
    },
    SignIn: {
        sceneClass: () => require('./screens/SignInScreen'),
        title: 'Sign In', 
        leftLabelText: 'Close'
    },
    SignUp: {
        sceneClass: () => require('./screens/SignUpScreen'),
        title: 'Sign Up', 
        leftLabelText: 'Cancel'
    },
    TermsAndPrivacy: {
        sceneClass: () => require('./screens/TermsAndPrivacyScreen'),
        title: 'Terms and Privacy Policy', 
        leftLabelText: 'Back'
    },
    PasswordReset: {
        sceneClass: () => require('./screens/PasswordResetScreen'),
        title: 'Password Reset', 
        leftLabelText: 'Cancel',
        protected: true
    },
    NewPassword: {
        sceneClass: () => require('./screens/NewPasswordScreen'),
        title: 'Enter New Password', 
        protected: true
    },
    Studies: {
        sceneClass: () => require('./screens/StudiesScreen'),
        title: 'Studies',
        protected: true
    },
    ApplyForStudy: {
        sceneClass: () => require('./screens/ApplyForStudyScreen'),
        title: 'Apply For Study', 
        leftLabelText: 'Cancel',
        protected: true
    },
    RecordVideo: {
        sceneClass: () => require('./screens/VideoRecordingScreen'),
        title: 'Record Video',
        leftLabelText: 'Back',
        protected: true
    },
    Questions: {
        sceneClass: () => require('./screens/QuestionScreen'),
        title: 'Questions',
        protected: true
    }, 
    Account: {
        sceneClass: () => require('./screens/AccountScreen'),
        title: 'Account',
        protected: true
    },
    EditAccount: {
        sceneClass: () => require('./screens/EditAccountScreen'),
        title: 'Edit Account', 
        leftLabelText: 'Cancel', 
        rightLabelText: 'Save',
        protected: true
    },
    ChangeProfilePicture: {
        sceneClass: () => require('./screens/ChangeProfilePictureScreen'),
        title: 'Change Profile Picture', 
        leftLabelText: '',
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

                onWillFocus(event) {
                    console.log('onWillFocus', event.target._currentRoute);
                    console.log('this', this);
                },
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
                renderLeftButton() {
                    return (
                        <NavButton 
                            navigator={ navigator }
                            labelText={ currentRoute.leftLabelText }/>
                    )
                },
                renderRightButton() {
                    if (currentRoute.rightLabelText) {
                        return (
                            <NavButton 
                                navigator={ navigator }
                                labelText={ currentRoute.rightLabelText } />
                        );
                    } 
                    return null;
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
