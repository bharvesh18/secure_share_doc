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
  apiKey: "API KEY",
  authDomain: "AUTH DOMAIN",
  projectId: "PROJECT ID",
  storageBucket: "STORAGE BUCKET",
  messagingSenderId: "MESSAGINGID",
  appId: "APPID"
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
