// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHirRhYyigrJuS2boWetxap5AE0m-nV_Y",
  authDomain: "aiflixhub.firebaseapp.com",
  projectId: "aiflixhub",
  storageBucket: "aiflixhub.appspot.com",
  messagingSenderId: "1074554146594",
  appId: "1:1074554146594:web:5d9db197e8819bcc051f7b",
  measurementId: "G-1KEZ35Z2DD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//auth use everywhere therefore we use it here to use it once
export const auth = getAuth();

