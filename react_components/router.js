'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image,
  TouchableHighlight
} = React;

var navigator;

let Router = {
  // set navigator based on screen (sugar)
  setNavigator(_navigator) {
    navigator = _navigator;
  },
  // go to a route (sugar)
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
    Home() {
      return {
        // Return a React component class for the scene. It receives a prop
        // called `navigator` that you can use to push on more routes.
        getSceneClass() {
          return require('./screens/WelcomeSplashScreen');
        },

        // When this scene receives focus, you can run some code. We're just
        // proxying the `didfocus` event that Navigator emits, so refer to
        // Navigator's source code for the semantics.
        onDidFocus(event) {
          console.log('Home Scene received focus.');
        },


        // Return a string to display in the title section of the navigation bar.
        // This route's title is displayed next to the back button when you push
        // a new route on top of this one.
        getTitle() {
          return 'Welcome';
        },
      };
    },

    RecordVideo() {
      return {
        renderTitle() {
          return (
            <View style={styles.container}>
              <Text style={styles.title}>'Record Video'</Text>
            </View>
          );
        },

        getSceneClass() {
          return require('./screens/VideoRecordingScreen');
        },

        getTitle() {
          return 'Record Video';
        }
      };
    },

    Questions() {
      return {
        renderTitle() {
          return (
            <View style={styles.container}>
              <Text style={styles.title}>'Question'</Text>
            </View>
          );
        },

        getSceneClass() {
          return require('./screens/QuestionScreen');
        },

        getTitle() {
          return 'Question';
        }
      };
    },
  }
};

var styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    flex: 1
  },
  titleName: {
    marginLeft: 5,
    fontWeight: 'bold'
  },
  titlePhoto: {
    height: 30,
    width: 30,
    borderRadius: 15,

  }

};

module.exports = Router