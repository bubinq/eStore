import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDgb_eFahowPeCSyThL6JPJTATV52shoi4",
    authDomain: "ecommerce-store-699dd.firebaseapp.com",
    projectId: "ecommerce-store-699dd",
    storageBucket: "ecommerce-store-699dd.appspot.com",
    messagingSenderId: "501837645339",
    appId: "1:501837645339:web:0d65155130c932a225dabe"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)