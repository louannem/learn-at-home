import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyA-jnjz_XQ8N0ML78R85HEmkj_Js1dHw60",
    authDomain: "learn-at-home-app.firebaseapp.com",
    projectId: "learn-at-home-app",
    storageBucket: "learn-at-home-app.appspot.com",
    messagingSenderId: "767119808501",
    appId: "1:767119808501:web:5d489ccdc474d653f672bc"
})

export const auth = firebase.auth()
export default app