// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD513fZvSu8PwR6rLNbx1g5UrlJO71WtFs",
  authDomain: "gohunt-77f6d.firebaseapp.com",
  projectId: "gohunt-77f6d",
  storageBucket: "gohunt-77f6d.appspot.com",
  messagingSenderId: "832145364613",
  appId: "1:832145364613:web:278e6d0c228fbcf5cdfbec",
  measurementId: "G-GVHEGJN59X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);