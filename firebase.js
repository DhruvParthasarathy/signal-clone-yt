
import { initializeApp } from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBcQlWfe1JpDCzXuCvvy3hUAOW9o0Lrdw4",
    authDomain: "signal-clone-yt-buils.firebaseapp.com",
    projectId: "signal-clone-yt-buils",
    storageBucket: "signal-clone-yt-buils.appspot.com",
    messagingSenderId: "473678801049",
    appId: "1:473678801049:web:10243153d27f3bafafb008"
  };

// initializing the firestore in a native app

initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

export {db, auth};