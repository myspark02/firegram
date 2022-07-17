  // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAMbRYJxP57z4Ja8JSzyKYvq4OhN1ggLQA",
    authDomain: "firegram-99d76.firebaseapp.com",
    projectId: "firegram-99d76",
    storageBucket: "firegram-99d76.appspot.com",
    messagingSenderId: "127730737702",
    appId: "1:127730737702:web:b1a1e36c232b73c1a47ce7"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const projectStorage = firebase.storage()
  const projectFirestore = firebase.firestore()

  export {projectStorage, projectFirestore}