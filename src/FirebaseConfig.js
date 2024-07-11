// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpUeikcZaLECifbg2ktMSkqMaViwbBiXE",
  authDomain: "admarket-c9cdd.firebaseapp.com",
  projectId: "admarket-c9cdd",
  storageBucket: "admarket-c9cdd.appspot.com",
  messagingSenderId: "72815876358",
  appId: "1:72815876358:web:54944bc9c849c9e68ee687",
  databaseURL:"https://admarket-c9cdd.firebaseio.com"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
