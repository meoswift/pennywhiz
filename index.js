const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const firebase = require("firebase/app");
const auth   = require("firebase/auth");
const firebaseui = require('firebaseui');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

var firebaseConfig = {
    apiKey: "AIzaSyBI7YW8WHkQn6Mvp7bjt6O0fGjiPhxVv6A",
    authDomain: "pennywhiz-49ed0.firebaseapp.com",
    databaseURL: "https://pennywhiz-49ed0.firebaseio.com",
    projectId: "pennywhiz-49ed0",
    storageBucket: "pennywhiz-49ed0.appspot.com",
    messagingSenderId: "337268457584",
    appId: "1:337268457584:web:d7c1950702b3d2741f34b5",
    measurementId: "G-HZMF81JZD0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

var uiConfig = {
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
  // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
// tosUrl and privacyPolicyUrl accept either url string or a callback
// function.
// Terms of service url/callback.
  tosUrl: '<your-tos-url>',
// Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  }
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
