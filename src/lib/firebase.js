import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsfKcI4R7PfUW0uvQcFr3fgYFujdEWEcw",
  authDomain: "flipbooks-20b0d.firebaseapp.com",
  projectId: "flipbooks-20b0d",
  storageBucket: "flipbooks-20b0d.firebasestorage.app",
  messagingSenderId: "1085749222608",
  appId: "1:1085749222608:web:36a0ae286ad925043ed2d5",
  measurementId: "G-1JK8F4TCK4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 