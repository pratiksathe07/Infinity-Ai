// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "infinity-ai-afa19.firebaseapp.com",
  projectId: "infinity-ai-afa19",
  storageBucket: "infinity-ai-afa19.firebasestorage.app",
  messagingSenderId: "88993198377",
  appId: "1:88993198377:web:98d3b01f142df222350738"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider }