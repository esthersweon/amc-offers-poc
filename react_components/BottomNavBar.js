'use strict';

let React = require('react-native'),
    Router = require('./Router'),
    auth = require('./api/auth'),
    styles = require('./Styles');

let {
    Text,
    View,
    TouchableOpacity
} = React;

let BottomNavBar = React.createClass({   
    render: function() {

      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity onPress={Router.setRoute('Studies')}>
            <Text style={{textAlign: 'center'}}>Studies</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{textAlign: 'center'}}>Uploads</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Router.setRoute('Account')}>
            <Text style={{textAlign: 'center'}}>Account</Text>
          </TouchableOpacity>
        </View>
      );
    }
});

module.exports = BottomNavBar;