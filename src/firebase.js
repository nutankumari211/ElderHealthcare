import firebase from "firebase/compat/app"; // Use compat to support both v8 and v9
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {apiKey: "AIzaSyCX2Nwu9G1Z42sk6ibRRUjIJqSD6egUI4U",
authDomain: "medicine-270c1.firebaseapp.com",
projectId: "medicine-270c1",
storageBucket: "medicine-270c1.appspot.com",
messagingSenderId: "865444017356",
appId: "1:865444017356:web:041345059c093d32f07e69"

};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();