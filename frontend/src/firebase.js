// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDoLVVGpimIpCH_rU0hkm6YwlUFnhfUq3Q",
  authDomain: "tastelink-40568.firebaseapp.com",
  projectId: "tastelink-40568",
  storageBucket: "tastelink-40568.appspot.com",
  messagingSenderId: "310628721781",
  appId: "1:310628721781:web:efdafe896ce90434a9843c",
  measurementId: "G-2JTK1Q4D9E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { auth, db,app };
