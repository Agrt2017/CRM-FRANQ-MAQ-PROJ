import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase - Reemplazar con las credenciales de tu proyecto
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO_ID",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID",
  measurementId: "TU_MEASUREMENT_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
