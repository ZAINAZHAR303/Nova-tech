// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3RbEKBY-CHiz4s-s8-D8kITU3QxIhSG0",
  authDomain: "nova-tech-95358.firebaseapp.com",
  projectId: "nova-tech-95358",
  storageBucket: "nova-tech-95358.firebasestorage.app",
  messagingSenderId: "647469224569",
  appId: "1:647469224569:web:19d139b61371e33f98faa8",
  measurementId: "G-9M3ZBK476G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);