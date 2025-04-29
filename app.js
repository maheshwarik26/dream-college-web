// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiiX2W3PChyQNIVaGm1ZYPS_ERvz9EHS0",
  authDomain: "dream-college-web.firebaseapp.com",
  projectId: "dream-college-web",
  storageBucket: "dream-college-web.firebasestorage.app",
  messagingSenderId: "938247340861",
  appId: "1:938247340861:web:40a9b9301fbe0e11353b54",
  measurementId: "G-0CTM02FZFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
