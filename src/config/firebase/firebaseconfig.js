import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAzSiOc05fSiWHQeC67mtm03HLXAOMWxkU",
    authDomain: "blogging-app-4be7a.firebaseapp.com",
    projectId: "blogging-app-4be7a",
    storageBucket: "blogging-app-4be7a.appspot.com",
    messagingSenderId: "779504176304",
    appId: "1:779504176304:web:244f43f7d60dec874abf75",
    measurementId: "G-J1MX2L48RY"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app