import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCd7DhpjPXJ7fWMDEwsAZSe0kX2TwedMVg",
    authDomain: "proyecto-final-3bd3f.firebaseapp.com",
    databaseURL: "https://proyecto-final-3bd3f.firebaseio.com",
    projectId: "proyecto-final-3bd3f",
    storageBucket: "proyecto-final-3bd3f.appspot.com",
    messagingSenderId: "414353128299",
    appId: "1:414353128299:web:441d77bf8ca1830b1eaa2e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth =  firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage()

  export {firebase, auth, db, storage}