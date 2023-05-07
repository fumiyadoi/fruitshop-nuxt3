export interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface ItemCount extends Item {
  count: number;
}

export const useCartItems = () => {
  const cartItems = useState<ItemCount[]>("items", () => []);

  // 商品を追加する関数
  const addItem = (item: Item) => {
    const itemIds = cartItems.value.map((item) => item.id);
    if (itemIds.includes(item.id)) {
      const index = itemIds.indexOf(item.id);
      cartItems.value[index].count += 1;
    } else {
      cartItems.value.push({ ...item, count: 1 });
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

  // ログアウトする関数
  const deleteItem = (id: string) => {
    const itemIds = cartItems.value.map((item) => item.id);
    if (itemIds.includes(id)) {
      const index = itemIds.indexOf(id);
      cartItems.value.splice(index, 1);
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
    calculateTotalCount,
    calculateTotalPrice,
  };
};
