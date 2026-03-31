// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth"; // Za prijavu korisnika
import "firebase/firestore"; // Za bazu podataka

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCZr3oXPMboLB9jhkxkpeHNdKK_h0LnRBA",

  authDomain: "projekt-oprema-tim322.firebaseapp.com",

  projectId: "projekt-oprema-tim322",

  storageBucket: "projekt-oprema-tim322.firebasestorage.app",

  messagingSenderId: "339423872890",

  appId: "1:339423872890:web:ef4cf8dfc7a8d0219278c3",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
