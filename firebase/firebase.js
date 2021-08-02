import firebase from 'firebase';



var firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "topspots-a6fec.firebaseapp.com",
    projectId: "topspots-a6fec",
    storageBucket: "topspots-a6fec.appspot.com",
    // messagingSenderId: "911951530837",
    appId: "1:911951530837:web:f345c76f8feeb973d8fddc",
    measurementId: "G-X14FX8RW9D"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
