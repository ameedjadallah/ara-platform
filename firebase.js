// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_PlU_WM_NyOBhELfiXwTkmzNiKQtV8zk",
  authDomain: "araapp-32125.firebaseapp.com",
  databaseURL: "https://araapp-32125-default-rtdb.firebaseio.com",
  projectId: "araapp-32125",
  storageBucket: "araapp-32125.appspot.com",
  messagingSenderId: "1048297371237",
  appId: "1:1048297371237:web:f1179bf133898524c3b88c",
  measurementId: "G-B8XD11SVWT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
