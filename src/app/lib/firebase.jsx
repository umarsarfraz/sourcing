// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // ✅ Import storage

// ✅ Correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDmi2aITKOMCTj7EaAK18vxAwqdeySKNgc",
  authDomain: "sourcing-website.firebaseapp.com",
  projectId: "sourcing-website",
  storageBucket: "sourcing-website.firebasestorage.app",
 // ✅ Correct domain
  messagingSenderId: "701730900569",
  appId: "1:701730900569:web:c85aac0417d69717fdbf48",
  measurementId: "G-26WR6TN8XB"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // ✅ Initialize storage

// ✅ Export services
export { db, auth, storage };
