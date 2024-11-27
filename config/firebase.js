// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Add this line
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3RbEKBY-CHiz4s-s8-D8kITU3QxIhSG0",
  authDomain: "nova-tech-95358.firebaseapp.com",
  projectId: "nova-tech-95358",
  storageBucket: "nova-tech-95358.appspot.com",
  messagingSenderId: "647469224569",
  appId: "1:647469224569:web:19d139b61371e33f98faa8",
  measurementId: "G-9M3ZBK476G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(app);
export const auth = getAuth(app);
