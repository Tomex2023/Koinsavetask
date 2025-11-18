import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
  getAuth
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCAscSdeQQyWMvDM51MbZD-hNH0uFK2aQw",
  authDomain: "myfirebaseauth321.firebaseapp.com",
  projectId: "myfirebaseauth321",
  storageBucket: "myfirebaseauth321.firebasestorage.app",
  messagingSenderId: "365629004918",
  appId: "1:365629004918:web:13c53cf850f7c911e89357"
};

const app = initializeApp(firebaseConfig);

export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
