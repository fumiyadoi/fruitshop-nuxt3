import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updatePassword,
  deleteUser,
} from "firebase/auth";

export const useAuth = () => {
  const token = useState<string | null>("token", () => null);

  // メールアドレス新規登録関数
  const signUp = async (email: string, password: string) => {
    try {
      // getAuth()でAuthを取得
      const auth = getAuth();
      // メールアドレスとパスワードでアカウントを作成する
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
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
  const deleteAuth = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        await signOut();
        await deleteUser(user);
      }
    } catch (error) {
      throw error;
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
    deleteAuth,
  };
};
