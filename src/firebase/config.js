//Config
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6pbPYNnqoAK9h97vexhbjacSnH_6yq10",
  authDomain: "sports-project-6424b.firebaseapp.com",
  projectId: "sports-project-6424b",
  storageBucket: "sports-project-6424b.appspot.com",
  messagingSenderId: "240561016816",
  appId: "1:240561016816:web:796361c6a26d9fecfdd735",
  measurementId: "G-VN8M1PT1V1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app as firebaseApp };
