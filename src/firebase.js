import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  // conexao firebase
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
});

firebase.firestore().enablePersistence();

const auth = firebase.auth();
const database = firebaseApp.firestore();

export { auth, database };
