import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCY8MK1Pa_nSwjqExHoidyUYzw0gBceIAI",
    authDomain: "foodtracking-2b13b.firebaseapp.com",
    projectId: "foodtracking-2b13b",
    storageBucket: "foodtracking-2b13b.firebasestorage.app",
    messagingSenderId: "1027319983262",
    appId: "1:1027319983262:web:0793054c129c1293ed5f8f"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, onValue };
