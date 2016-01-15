'use strict';

var React = require('react-native');

var {
    AsyncStorage
} = React;

// mock response
var response = {
  success: true,
  token: 'logged_in'
};

// TODO - PERSIST LOGIN STATE SOMEHOW
// PERHAPS USING ASYNC STORAGE

var auth = {
  login(credentials) {
    return new Promise((resolve, reject) => {
      console.log('make auth request with credentials : ', credentials);
      // make auth request
      setTimeout(() => {
        if (response.success) {
          
          resolve(response);
        }
        else {
          reject(response);
        }
      }, 300);
    });
  }
};

module.exports = auth;