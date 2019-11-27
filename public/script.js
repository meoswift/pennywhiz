var firebaseConfig = {
    apiKey: config.key || process.env.key,
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
