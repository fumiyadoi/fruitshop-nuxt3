import { getDocs, query, collection } from "firebase/firestore";

export interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const useItems = () => {
  const items = useState<Item[]>("items", () => []);

  const { db } = useFirebase();

  // レシートを取得する関数
  const getItems = async () => {
    const itemsSnapshot = await getDocs(query(collection(db, "items")));
    const itemsDocs = itemsSnapshot.docs;
    items.value = itemsDocs.map((itemDoc) => {
      const itemData = itemDoc.data() as Item;
      return {
        ...itemData,
        id: itemDoc.id,
      };
    });
  };

  const searchItems = async (text: string) => {
    await getItems();
    items.value = items.value.filter((item) => {
      return item.name.includes(text);
    });
  };

  return {
    items,
    getItems,
    searchItems,
  };
};
