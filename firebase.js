// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, getMetadata } from "firebase/storage"; // Import functions from storage module

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
export const storage = getStorage(app);

export const database = getFirestore(app);

export const getFileDownloadURL = async (filePath) => {
  const fileRef = ref(storage, filePath);
  try {
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error("Error getting file download URL:", error);
    return null;
  }
};

export const getFileMetadata = async (filePath) => {
  const fileRef = ref(storage, filePath);
  try {
    const metadata = await getMetadata(fileRef);
    return metadata;
  } catch (error) {
    console.error("Error getting file metadata:", error);
    return null;
  }
};
