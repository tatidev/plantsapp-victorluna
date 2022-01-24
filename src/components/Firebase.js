import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqI5H8HLAzhqXS05NJgd938LrCLLQTUM4",
  authDomain: "plantsapp-bc59b.firebaseapp.com",
  projectId: "plantsapp-bc59b",
  storageBucket: "plantsapp-bc59b.appspot.com",
  messagingSenderId: "215292342523",
  appId: "1:215292342523:web:a6e70ca8ce11f149fb005e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);