// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDmi2aITKOMCTj7EaAK18vxAwqdeySKNgc",
  authDomain: "sourcing-website.firebaseapp.com",
  projectId: "sourcing-website",
  storageBucket: "sourcing-website.firebasestorage.app",
  messagingSenderId: "701730900569",
  appId: "1:701730900569:web:c85aac0417d69717fdbf48",
  measurementId: "G-26WR6TN8XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
