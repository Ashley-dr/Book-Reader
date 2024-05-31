/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYGatu2FrtbMGlW3I7POESF1iEJvUtkY0",
  authDomain: "book-reader-bb5f2.firebaseapp.com",
  projectId: "book-reader-bb5f2",
  storageBucket: "book-reader-bb5f2.appspot.com",
  messagingSenderId: "146766214384",
  appId: "1:146766214384:web:b6200296f3dd775b04fe35",
  measurementId: "G-Z40TX6PSJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth};