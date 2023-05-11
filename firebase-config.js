import { initializeApp } from "firebase/app";
import {
    getFirestore , collection , addDoc , updateDoc 
     , doc , getDocs , deleteDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPS28C9D23juJmu10VkIGOa2qjwtOHT6M",
  authDomain: "storelist-35c91.firebaseapp.com",
  projectId: "storelist-35c91",
  storageBucket: "storelist-35c91.appspot.com",
  messagingSenderId: "463820224697",
  appId: "1:463820224697:web:bdbfe950e6ce5ff18c4368"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db ,
    collection, 
    addDoc,
    updateDoc,
    doc, 
    getDocs ,
    deleteDoc 
}