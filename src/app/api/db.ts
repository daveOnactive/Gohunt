import { initializeFirestore } from "firebase/firestore";
import { app } from "../../services";


export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});