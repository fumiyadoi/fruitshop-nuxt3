import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseApp from "~/plugins/firebase.client";

export const useFirebase = () => {
  const db = getFirestore(firebaseApp);
  const database = getDatabase(firebaseApp);
  const storage = getStorage(firebaseApp);

  return { db, database, storage };
};
