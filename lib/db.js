import firebase from "firebase/app";
import "firebase/database"
import firebaseClient from "./firebaseClient";

var database = firebase.database().ref().child("users");

export default function createUser(data){
    firebaseClient();
    firebase
    .database()
    .ref("users")
    .set(data, (error) => {
      if (error) {
        return error.message;
      } else {
        return "Created User";
      }
    });
};
