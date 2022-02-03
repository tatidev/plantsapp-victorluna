import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const envar = process.env

const firebaseConfig = {
  apiKey: envar.REACT_APP_apiKey, 
  authDomain: envar.REACT_APP_authDomain,
  projectId: envar.REACT_APP_projectId,
  storageBucket: envar.REACT_APP_storageBucket,
  messagingSenderId: envar.REACT_APP_messagingSenderId,
  appId: envar.REACT_APP_appId
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);