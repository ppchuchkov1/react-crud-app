// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDpF4Obsip2bIU7dJ6nInUWtVUt6QkWaxg',
  authDomain: 'react-auth-todo-f2f73.firebaseapp.com',
  projectId: 'react-auth-todo-f2f73',
  storageBucket: 'react-auth-todo-f2f73.appspot.com',
  messagingSenderId: '273043056153',
  appId: '1:273043056153:web:738598c8f9006e4cda6c88',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
