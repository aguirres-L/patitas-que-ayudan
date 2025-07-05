// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbg-XrnYMyKO8JPiewi7H54gF_Pmx5cdI",
  authDomain: "toner-app.firebaseapp.com",
  projectId: "toner-app",
  storageBucket: "toner-app.firebasestorage.app",
  messagingSenderId: "443927583370",
  appId: "1:443927583370:web:ff0d092b79bed1913beb73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 