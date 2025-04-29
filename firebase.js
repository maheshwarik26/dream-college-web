// firebaseInit.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Add this line
// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDiiX2W3PChyQNIVaGm1ZYPS_ERvz9EHS0",
    authDomain: "dream-college-web.firebaseapp.com",
    projectId: "dream-college-web",
    storageBucket: "dream-college-web.appspot.com",
    messagingSenderId: "938247340861",
    appId: "1:938247340861:web:40a9b9301fbe0e11353b54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export Firebase services
export { db, auth };
