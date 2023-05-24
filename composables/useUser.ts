import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const useUser = () => {
  const { db } = useFirebase();

  const { getUserId } = useAuth();

  const createUser = async (userId: string, nickname: string) => {
    try {
      await setDoc(doc(db, "users", userId), {
        nickname: nickname,
      });
    } catch (error) {
      throw error;
    }
  };

  const changeNickname = async (nickname: string) => {
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("ユーザーIDが取得できませんでした");
      }
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        nickname: nickname,
      });
    } catch (error) {
      throw error;
    }
  };

  // 退会関数
  const deleteUser = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        window.alert("ユーザーIDが取得できませんでした");
        return;
      }
      const receiptsSnapshot = await getDocs(
        query(collection(db, "users", userId, "receipts"))
      );
      const receiptsDocs = receiptsSnapshot.docs;
      for (const receiptsDoc of receiptsDocs) {
        await deleteDoc(doc(db, "users", userId, "items", receiptsDoc.id));
      }
      await deleteDoc(doc(db, "users", userId));
    } catch (error) {
      throw error;
    }
  };

  return {
    createUser,
    changeNickname,
    deleteUser,
  };
};
