import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC035-l-qMqkFD60_QRYqS3fADgJV8gbKA",
  authDomain: "post-keeper.firebaseapp.com",
  projectId: "post-keeper",
  storageBucket: "post-keeper.appspot.com",
  messagingSenderId: "550139856924",
  appId: "1:550139856924:web:d6c95e7a5879ff3b8a77d9"
};
let app

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};