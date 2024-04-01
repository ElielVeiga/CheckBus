import {initializeApp} from "firebase/app";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
// eslint-disable-next-line import/order

const firebaseConfig = {
  apiKey: "AIzaSyDU9gMnGCghgL1FmUVUpFmg2ERqmL5fonI",
  authDomain: "appforvimsa.firebaseapp.com",
  projectId: "appforvimsa",
  storageBucket: "appforvimsa.appspot.com",
  messagingSenderId: "673785792217",
  appId: "1:673785792217:web:b267adccfacbeac8ef60c8"
  // apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  // projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  // storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  // //measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// eslint-disable-next-line prettier/prettier, no-undef
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
// eslint-disable-next-line no-undef
const db = getFirestore(app);
export default db;
