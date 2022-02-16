// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { 
  getFirestore, 
  collection,
  addDoc, 
  getDocs, 
  deleteDoc, 
  onSnapshot, 
  doc, 
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaFIj1YWWmLX9rJwD9-wEseHF7VWBn734",
  authDomain: "fir-javascript-crud-4250b.firebaseapp.com",
  projectId: "fir-javascript-crud-4250b",
  storageBucket: "fir-javascript-crud-4250b.appspot.com",
  messagingSenderId: "517258000463",
  appId: "1:517258000463:web:6235cb37f77ec8c034523a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTask =(title, descripcion) => 
    addDoc(collection (db, 'tasks'), {title, descripcion});

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => 
  updateDoc(doc(db, 'tasks', id), newFields)