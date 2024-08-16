// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDC9yTHDZKNhYjbkpzdDp9nelSYYAlpLQ",
  authDomain: "twist-buy-b2a12.firebaseapp.com",
  projectId: "twist-buy-b2a12",
  storageBucket: "twist-buy-b2a12.appspot.com",
  messagingSenderId: "135908451546",
  appId: "1:135908451546:web:dbc486893bcc24143231e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);