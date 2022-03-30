// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZi2PBDDPwuDLf9OSIr5sRfYQuRAX-bdU",
  authDomain: "nextjs-chatapp-chakraui.firebaseapp.com",
  projectId: "nextjs-chatapp-chakraui",
  storageBucket: "nextjs-chatapp-chakraui.appspot.com",
  messagingSenderId: "841720776490",
  appId: "1:841720776490:web:baab1a9369b41c0249c053"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }