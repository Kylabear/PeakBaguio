import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJ564oay2U0WPQ8V2p0hGEzY848JlnI9c",
  authDomain: "peakbaguio-3173a.firebaseapp.com",
  databaseURL: "https://peakbaguio-3173a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "peakbaguio-3173a",
  storageBucket: "peakbaguio-3173a.firebasestorage.app",
  messagingSenderId: "777024042992",
  appId: "1:777024042992:web:86b0b9ef0e7e9e102a0f35",
  measurementId: "G-HWM2K6HG9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firestore database and Authentication
export const db = getFirestore(app);
export const auth = getAuth(app); // Fix: Export auth object
export { storage };

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with your Firebase private key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
