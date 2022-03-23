import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX5zsw9d3Wy6Yp5eINWBqft9c3c5pDjTg",
  authDomain: "dream--residencies.firebaseapp.com",
  projectId: "dream--residencies",
  storageBucket: "dream--residencies.appspot.com",
  messagingSenderId: "109737410328",
  appId: "1:109737410328:web:f25b035da398468f5fe86d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(); 