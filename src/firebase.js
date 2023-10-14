// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBa6wOl3X-G5Z6rqdbLfN7nvgDT6uQI-Dk",
  authDomain: "major-project-2d90b.firebaseapp.com",
  projectId: "major-project-2d90b",
  storageBucket: "major-project-2d90b.appspot.com",
  messagingSenderId: "805245451867",
  appId: "1:805245451867:web:90839bf67a7abfa2bc097e",
  measurementId: "G-G86TKBNNMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();


export {app, auth,provider};