import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgfAB5ggfdA_OCYRtAChkJ7S6_9RG9SXw",
  authDomain: "medico-bc0a5.firebaseapp.com",
  projectId: "medico-bc0a5",
  storageBucket: "medico-bc0a5.appspot.com",
  messagingSenderId: "630284358789",
  appId: "1:630284358789:web:9b47d5f249df09f5f445ec",
  measurementId: "G-WHZY3QF1R0"
};

export const Export = () => {
  const App = initializeApp(firebaseConfig);
  const Google = new GoogleAuthProvider();
  const Facebook = new FacebookAuthProvider();
  const DB = getFirestore();
  
  return { App, Facebook, Google, DB };
};
