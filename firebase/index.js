// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvgHJCIW6MDujwkMA4esZETflFDB_zf_Y",
  authDomain: "shoecart-31d68.firebaseapp.com",
  projectId: "shoecart-31d68",
  storageBucket: "shoecart-31d68.appspot.com",
  messagingSenderId: "292933094617",
  appId: "1:292933094617:web:2e470c1c452919056d02c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
