import { getDocs, query, collection, orderBy } from "firebase/firestore";
import { ItemCount } from "./useCartItems";

export interface Receipt {
  createdAt: Date;
  items: ItemCount[];
}

export const useReceipts = () => {
  const receipts = useState<Receipt[]>("receipts", () => []);

  const { getUserId } = useAuth();
  const { db } = useFirebase();

  // レシートを取得する関数
  const getReceipts = async () => {
    const userId = getUserId();
    if (!userId) return [];
    const receiptsSnapshot = await getDocs(
      query(
        collection(db, "users", userId, "receipts"),
        orderBy("createdAt", "desc")
      )
    );
    const receiptsData = receiptsSnapshot.docs.map((doc) => {
      return {
        createdAt: doc.data().createdAt.toDate(),
        items: doc.data().items,
      };
    });
    receipts.value = receiptsData;
  };

  return {
    receipts,
    getReceipts,
  };
};
