import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8Yuw9sptrsOnfpi19h76dOE6dqw7wpgg",
    authDomain: "uhf-notes.firebaseapp.com",
    projectId: "uhf-notes",
    storageBucket: "uhf-notes.firebasestorage.app",
    messagingSenderId: "543798761418",
    appId: "1:543798761418:web:e534b6921ba10fc9ea2133",
    measurementId: "G-CE2EJYV0FR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };