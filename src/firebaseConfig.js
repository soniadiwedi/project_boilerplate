import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyA-9-kM1bFTjKbIiCM5j5KA6ed2wAxsfgo",
  authDomain: "react-crud-f2dd1.firebaseapp.com",
  projectId: "react-crud-f2dd1",
  storageBucket: "react-crud-f2dd1.appspot.com",
  messagingSenderId: "1032047836894",
  appId: "1:1032047836894:web:84c147b8e53f37f8bccc4f",
  measurementId: "G-EHZ0YG7FR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage=getStorage(app)