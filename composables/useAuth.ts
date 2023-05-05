import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
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
      console.log(userCredential);
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
    } catch (error) {
      throw error;
    }
  };

  // ログイン状態確認関数
  const checkIsLogined = async () => {
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

  return {
    token,
    signUp,
    signIn,
    signOut,
    checkIsLogined,
  };
};
