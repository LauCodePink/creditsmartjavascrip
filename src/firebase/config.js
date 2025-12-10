// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuNWK6JkDds_9TgXlegJlRfu8rVd5qi0I",
  authDomain: "creditsmart-jdl-839f2.firebaseapp.com",
  projectId: "creditsmart-jdl-839f2",
  storageBucket: "creditsmart-jdl-839f2.firebasestorage.app",
  messagingSenderId: "388535421310",
  appId: "1:388535421310:web:1bcca85f77847ef8898b2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)