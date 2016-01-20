'use strict';

let React = require('react-native');

let {
    AsyncStorage
} = React;

// sign_in_endpoint
let sign_in_endpoint = {
    uri: 'http://dev.mindswarms.com/api/authenticate.json',
    options(credentials) {
        return {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }
    }
};

// sign__endpoint
let sign_up_endpoint = {
    uri: 'http://dev.mindswarms.com/consumers/register',
    options(credentials) {
        return {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }
    }
};

let SessionNamespace = 'MindswarmsApp.user.session';

let user = {};
let auth = {
    loggedIn() {
        return new Promise((resolve, reject) => {
            // get from memory, then check storage
            if (user.session) {
                resolve(user.session);
            } else {
                console.log('get from AsyncStorage');
                AsyncStorage.getItem(SessionNamespace, (err, session) => {
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

        AsyncStorage.setItem(SessionNamespace, session);
    },

    signIn(credentials) {
        return new Promise((resolve, reject) => {
            fetch(sign_in_endpoint.uri, sign_in_endpoint.options(credentials)).then((response) => {
                if (response.ok) {
                    response.responseBody = JSON.parse(response._bodyText);
                    this.setSession(response.responseBody.api_key);

                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    },

    signUp(credentials) {
        return new Promise((resolve, reject) => {
            fetch(sign_up_endpoint.uri, sign_up_endpoint.options(credentials)).then((response) => {
                console.log('response : ', response);
                if (response.ok) {
                    // TODO - get the successfully created new users credentials to work
                    let signInCredentials = {
                        email: 'test12@gmail.com', //credentials.consumer.email,
                        password: 'feet' //credentials.consumer.password
                    };

                    // For now - just resolve after signup (without api_key)
                    resolve(response);


                    console.log('credentials : ', signInCredentials);
                    // Try to get api_key
                    auth.signIn(signInCredentials)
                    .then((signInResponse) => {
                        // console.log('signInResponse', signInResponse);

                        signInResponse.responseBody = JSON.parse(signInResponse._bodyText);
                        this.setSession(signInResponse.responseBody.api_key);
                        // success
                    }, (err) => {
                       console.log('error', err);
                        // errors
                    });
                        
                } else {
                    reject(response);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    },    

    signOut() {
        AsyncStorage.removeItem(SessionNamespace);        
    }
};

module.exports = auth;