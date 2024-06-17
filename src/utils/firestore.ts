import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Function to save user data to Firestore
const saveUserData = async (userId: string, data: any) => {
  const userDoc = doc(db, "users", userId);
  await setDoc(userDoc, { data }, { merge: true });
};

// Function to load user data from Firestore
const loadUserData = async (userId: string) => {
  const userDoc = doc(db, "users", userId);
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    return docSnap.data().data;
  } else {
    return null;
  }
};

export { saveUserData, loadUserData };
