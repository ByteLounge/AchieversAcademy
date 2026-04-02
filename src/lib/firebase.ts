import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnkZdgbrusFU-j5aJ8aBPUVnnKF0aYjh0",
  authDomain: "studio-8953209199-aacdd.firebaseapp.com",
  projectId: "studio-8953209199-aacdd",
  storageBucket: "studio-8953209199-aacdd.firebasestorage.app",
  messagingSenderId: "64128717442",
  appId: "1:64128717442:web:270de44ec549bb60e79a9b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
