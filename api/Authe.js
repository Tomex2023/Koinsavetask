import { auth } from "../components/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";


export async function registerUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}


export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
