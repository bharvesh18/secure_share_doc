import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import "firebase/firestore";
//import { Firestore, getFirestore } from "firebase/firestore";
import "firebase/storage";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
import {getFunctions} from "firebase/functions"
const firebaseConfig = {
  apiKey: "AIzaSyADiRPxAf_vMPLPKbNHOdT-3uhr_bB9c0I",
  authDomain: "share-aa5d4.firebaseapp.com",
  projectId: "share-aa5d4",
  storageBucket: "share-aa5d4.appspot.com",
  messagingSenderId: "944707828907",
  appId: "1:944707828907:web:5e635fa173fb37f93b0bee"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const firestore = initializeFirestore(app, {
  experimentalForceLongPolling:true,
  useFetchStreams:false
})
const storage=getStorage(app);
const functions=getFunctions(app);
export {auth,firestore,storage,functions}