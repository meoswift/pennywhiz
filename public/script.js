var firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: "pennywhiz-49ed0.firebaseapp.com",
    databaseURL: "https://pennywhiz-49ed0.firebaseio.com",
    projectId: "pennywhiz-49ed0",
    storageBucket: "pennywhiz-49ed0.appspot.com",
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult(authResult, redirectUrl) {
      return true;
    }
  },
  signInFlow: 'redirect',
  signInSuccessUrl: 'overview',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
};

ui.start('#firebaseui-auth-container', uiConfig);

var name = '';
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('signed in');
    name = user.displayName;
    document.querySelector('#name').textContent = name;
  } else {
    console.log('not signed in');
  }
});
