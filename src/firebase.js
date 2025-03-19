// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken,  } from 'firebase/messaging';

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
const realtimeDb = getDatabase(app);
const firestoreDb = getFirestore(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const messaging = getMessaging(app);

export const requestNotificationPermission = () => {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' })
        .then(token => console.log('FCM Token:', token))
        .catch(err => console.error('Token error:', err));
    }
  });
};

export { auth, realtimeDb, messaging,firestoreDb,app, firestore };
