import firebase from 'firebase/app'
import "firebase/auth"

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyBi144OCVTFeaerVuOzqPiOIss8jKu2qNE",
    authDomain: "btf-chat.firebaseapp.com",
    projectId: "btf-chat",
    storageBucket: "btf-chat.appspot.com",
    messagingSenderId: "44827253793",
    appId: "1:44827253793:web:7d071373f01623d87c5760"
  }).auth();