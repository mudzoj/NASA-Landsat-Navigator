// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ7ISDX7CuQQjg9mOyegvLaWzLJ3-iKg8",
  authDomain: "nasa-hackathon-2024-b24c8.firebaseapp.com",
  projectId: "nasa-hackathon-2024-b24c8",
  storageBucket: "nasa-hackathon-2024-b24c8.appspot.com",
  messagingSenderId: "528882836206",
  appId: "1:528882836206:web:ad116c68e3959af68ac9ff",
  measurementId: "G-QP8K8JH7GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
