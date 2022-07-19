import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore'

// Don't forget to set Rules to true in Cloud Firebase to allow R&W
const app = initializeApp({
    apiKey: "AIzaSyAPTxdBzL7GgspV-RdSY1WONKZALNLgiB4",
    authDomain: "crud-test-3d04a.firebaseapp.com",
    projectId: "crud-test-3d04a",
    storageBucket: "crud-test-3d04a.appspot.com",
    messagingSenderId: "425567456344",
    appId: "1:425567456344:web:d816505d78dbafeb560e2d"
})

// access to the firestore
export const db = getFirestore(app);

export default app;