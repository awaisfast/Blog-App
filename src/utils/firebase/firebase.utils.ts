import { initializeApp } from "firebase/app";
import {
  User,
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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
export const db = getFirestore(firebaseapp);

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  if (!email || !password || !name) return;
  const res = await createUserWithEmailAndPassword(auth, email, password);
  if (auth) {
    updateProfile(auth.currentUser as User, {
      displayName: name,
    });
  }
  return res;
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
