import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJET_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENTER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);