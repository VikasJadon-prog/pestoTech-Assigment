
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL-k5IyChb6ZurP_bdIsUAou8hW1Rh5s4",
  authDomain: "reactapp-e3379.firebaseapp.com",
  projectId: "reactapp-e3379",
  storageBucket: "reactapp-e3379.appspot.com",
  messagingSenderId: "53655649202",
  appId: "1:53655649202:web:3c46f6311f784abff2c2ab",
  measurementId: "G-WS7R3MLSJJ"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };

