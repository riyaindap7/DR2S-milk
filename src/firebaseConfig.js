import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDAV2FRysXeGeyX98oweUPDSTks2n7hMfM",
    authDomain: "shrutidemo-2e752.firebaseapp.com",
    projectId: "shrutidemo-2e752",
    storageBucket: "shrutidemo-2e752.appspot.com",
    messagingSenderId: "354089387287",
    appId: "1:354089387287:web:579fca4e654d62d005a352",
    measurementId: "G-6M6148RZ70"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);