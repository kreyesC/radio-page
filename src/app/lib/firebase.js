import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDYduIfJY1MNkdT_m1EcnwPL45A3Z3gJS0",
    authDomain: "radiop-page.firebaseapp.com",
    projectId: "radiop-page",
    storageBucket: "radiop-page.appspot.com",
    messagingSenderId: "116021686603",
    appId: "1:116021686603:web:0f703b4d3824230e2538ce"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
