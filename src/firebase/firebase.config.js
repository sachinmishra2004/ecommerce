// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// console.log(import.meta.env.VITE_SOME_KEY)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi2velR85d2781dYWbULmNxlNIBL_noaU",
  authDomain: "fir-foodi-client-46cec.firebaseapp.com",
  projectId: "fir-foodi-client-46cec",
  storageBucket: "fir-foodi-client-46cec.appspot.com",
  messagingSenderId: "615104858719",
  appId: "1:615104858719:web:84e2e879d1a570e82c29ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
