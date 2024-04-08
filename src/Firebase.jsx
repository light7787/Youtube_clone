


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByTJ7xKZAqg_kyhPRMMFU4YLDFJ5Au1V4",
  authDomain: "clone-84e02.firebaseapp.com",
  projectId: "clone-84e02",
  storageBucket: "clone-84e02.appspot.com",
  messagingSenderId: "425426475864",
  appId: "1:425426475864:web:b191df5830f21039fce32d",
  measurementId: "G-6Y7NZ5E1S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


