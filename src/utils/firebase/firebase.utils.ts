import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAwoy_yOomZfFhadGibTHDdVDLh87wWcSY",
  authDomain: "blogging-application-68dc1.firebaseapp.com",
  projectId: "blogging-application-68dc1",
  storageBucket: "blogging-application-68dc1.appspot.com",
  messagingSenderId: "95272061704",
  appId: "1:95272061704:web:44919b03a5ea4437b57abd",
};
const firebaseapp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
