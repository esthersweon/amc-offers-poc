'use strict';

let React = require('react-native');

let {
    AsyncStorage
} = React;

// mock response
let response = {
    success: true,
    token: 'logged_in'
};

let AppNamespace = 'MindswarmsApp';

// TODO - PERSIST LOGIN STATE SOMEHOW
// PERHAPS USING ASYNC STORAGE
let user = {};
let auth = {
    loggedIn() {
        return new Promise((resolve, reject) => {
            // get from memory, then check storage
            if (user.session) {
                resolve(user.session);
            } else {
                console.log('get from async');
                AsyncStorage.getItem(AppNamespace + '-user.session', (err, session) => {
                    if (err) 
                        reject(err);
                    else 
                        resolve(session);
                });
            }            
        });
    },

    setSession(session) {
        user.session = session;

        AsyncStorage.setItem(AppNamespace + '-user.session', session);
    },

    login(credentials) {
        return new Promise((resolve, reject) => {
            console.log('make auth request with credentials : ', credentials);
            // make auth request
            setTimeout(() => {
                if (response.success) {
                    this.setSession(response.token);
                    resolve(response);
                }
                else {
                    reject(response);
                }
            }, 300);
        });
    },

    signOut() {
        AsyncStorage.removeItem(AppNamespace + '-user.session');        
    }
};

module.exports = auth;