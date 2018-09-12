import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAUqJ2a-Sv22J83uam2iJq7wU4KlJcZSp0",
    authDomain: "snipcode-3709a.firebaseapp.com",
    databaseURL: "https://snipcode-3709a.firebaseio.com",
    projectId: "snipcode-3709a",
    storageBucket: "snipcode-3709a.appspot.com",
    messagingSenderId: "235142164550"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
