import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyClMZ-sB_5Xbr9k1oPVuZtL046IJA-JHTY",
    authDomain: "chat-f2f03.firebaseapp.com",
    projectId: "chat-f2f03",
    storageBucket: "chat-f2f03.appspot.com",
    messagingSenderId: "848285323213",
    appId: "1:848285323213:web:ab884cbb5a4748077dfe84"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
