import firebase from "firebase/app";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBl6yCP19IywF6XQZDSSV3UsrWPEIn2ics",
  authDomain: "react-book-93a56.firebaseapp.com",
  projectId: "react-book-93a56",
  storageBucket: "react-book-93a56.appspot.com",
  messagingSenderId: "854136633406",
  appId: "1:854136633406:web:7fb590f8020267a565396f",
  databaseURL: "https://react-book-93a56-default-rtdb.firebaseio.com",
};


export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
