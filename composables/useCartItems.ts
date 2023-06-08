import { addDoc, collection } from "firebase/firestore";
import { Item } from "./useItems";

export interface CartItem extends Item {
  count: number;
}

export const useCartItems = () => {
  const cartItems = useState<CartItem[]>("cartItems", () => []);

  const { db } = useFirebase();
  const { getUserId } = useAuth();

  // 商品を追加する関数
  const addItem = (item: Item) => {
    const itemIds = cartItems.value.map((item) => item.id);
    if (itemIds.includes(item.id)) {
      const index = itemIds.indexOf(item.id);
      if (cartItems.value[index].count >= 10) return;
      cartItems.value[index].count += 1;
    } else {
      const newCartItem = { ...item, count: 1 };
      cartItems.value.push(newCartItem);
    }
  };

  // 商品の数を変更する関数
  const changeCount = (id: string, count: number) => {
    const itemIds = cartItems.value.map((item) => item.id);
    if (itemIds.includes(id)) {
      const index = itemIds.indexOf(id);
      cartItems.value[index].count = count;
    }
  };

  // 商品を削除する関数
  const deleteItem = (id: string) => {
    const itemIds = cartItems.value.map((item) => item.id);
    if (itemIds.includes(id)) {
      const index = itemIds.indexOf(id);
      cartItems.value.splice(index, 1);
    }
  };

  // 商品を購入する関数
  const purchaseItems = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        window.alert("購入に失敗しました");
        return;
      }
      await addDoc(collection(db, "users", userId, "receipts"), {
        createdAt: new Date(),
        items: cartItems.value,
      });
      cartItems.value = [];
      window.alert("購入しました");
    } catch (e) {
      window.alert("購入に失敗しました");
    }
  };

  const calculateTotalCount = () => {
    return cartItems.value.reduce((sum, item) => {
      return sum + item.count;
    }, 0);
  };

  const calculateTotalPrice = () => {
    return cartItems.value.reduce((sum, item) => {
      return sum + item.price * item.count;
    }, 0);
  };

  return {
    cartItems,
    addItem,
    changeCount,
    deleteItem,
    purchaseItems,
    calculateTotalCount,
    calculateTotalPrice,
  };
};
