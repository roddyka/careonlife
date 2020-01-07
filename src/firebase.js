import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyChOf2v2XDiVEVMC5hqU3ygBQDxcautQHg",
  authDomain: "careoncare-4283c.firebaseapp.com",
  databaseURL: "https://careoncare-4283c.firebaseio.com",
  projectId: "careoncare-4283c",
  storageBucket: "careoncare-4283c.appspot.com",
  messagingSenderId: "471874617432",
  appId: "1:471874617432:web:1095cc9a7fef042a8c8a2d"
});

firebase.firestore().enablePersistence();

const auth = firebase.auth();
const database = firebaseApp.firestore();

export { auth, database };
