import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBApkXHulDCZ0Kpf0I-nEoW_V1hIpuMIAQ",
  authDomain: "agences-d-activation.firebaseapp.com",
  projectId: "agences-d-activation",
  storageBucket: "agences-d-activation.firebasestorage.app",
  messagingSenderId: "283642695172",
  appId: "1:283642695172:web:7a46e6a1a2cea6cf9d6f51"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);