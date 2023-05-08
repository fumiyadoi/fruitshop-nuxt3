import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

export const useAuth = () => {
  const { db } = useFirebase();

  const token = useState<string | null>("token", () => null);

  // メールアドレス新規登録関数
  const signUp = async (nickname: string, email: string, password: string) => {
    try {
      // getAuth()でAuthを取得
      const auth = getAuth();
      // メールアドレスとパスワードでアカウントを作成する
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        nickname: nickname,
      });
      return "success";
    } catch (error) {
      throw error;
    }
  };

  // メールアドレスとパスワードでログインする関数
  const signIn = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      token.value = await userCredential.user.getIdToken();
    } catch (error) {
      throw error;
    }
  };

  // ログアウトする関数
  const signOut = async () => {
    try {
      const auth = getAuth();
      await firebaseSignOut(auth);
      token.value = null;
      await navigateTo("/");
    } catch (error) {
      throw error;
    }
  };

  // ログイン状態確認関数
  const checkIsLogined = () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // ユーザーID取得関数
  const getUserId = (): string | null => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        return user.uid;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // パスワード変更関数
  const changePassword = async (password: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, password);
      }
    } catch (error) {
      throw error;
    }
  };

  // 退会関数
  const deleteAccount = async () => {
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
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        await signOut();
        await deleteUser(user);
      }
      window.alert("退会しました");
    } catch (error) {
      window.alert("退会に失敗しました");
    }
  };

  return {
    token,
    signUp,
    signIn,
    signOut,
    checkIsLogined,
    getUserId,
    changePassword,
    deleteAccount,
  };
};
