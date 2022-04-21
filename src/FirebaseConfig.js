import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBllSt35pAK_cN3dWi6glSEebND3ixlIcg",
  authDomain: "paperboat-notes.firebaseapp.com",
  projectId: "paperboat-notes",
  storageBucket: "paperboat-notes.appspot.com",
  messagingSenderId: "584881415375",
  appId: "1:584881415375:web:6990c07e9eb9f8a31043ba",
  measurementId: "G-EZ4JERTRCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)