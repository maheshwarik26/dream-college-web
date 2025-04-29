// firebaseInit.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDiiX2W3PChyQNIVaGm1ZYPS_ERvz9EHS0",
  authDomain: "dream-college-web.firebaseapp.com",
  projectId: "dream-college-web",
  storageBucket: "dream-college-web.appspot.com",
  messagingSenderId: "938247340861",
  appId: "1:938247340861:web:40a9b9301fbe0e11353b54"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
