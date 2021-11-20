// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWJj2st4aDRIpcfkSrx4fzt4b27Jb6JQc",
  authDomain: "reels-410fa.firebaseapp.com",
  projectId: "reels-410fa",
  storageBucket: "reels-410fa.appspot.com",
  messagingSenderId: "842831535620",
  appId: "1:842831535620:web:7209fe957d203e2cdc9f51",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
  users: firestore.collection("users"),
  posts: firestore.collection("posts"),
  comments: firestore.collection("comments"),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const storage = firebase.storage();
