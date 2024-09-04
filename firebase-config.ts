import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC1x4rkGALfe6puVca-iSS_U7KBjEbQG20",
    authDomain: "amigurumis-e14f5.firebaseapp.com",
    projectId: "amigurumis-e14f5",
    storageBucket: "amigurumis-e14f5.appspot.com",
    messagingSenderId: "628359801883",
    appId: "1:628359801883:web:c2722213ae89959d021cbe",
    measurementId: "G-1CDF10ZZM9"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore y Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };