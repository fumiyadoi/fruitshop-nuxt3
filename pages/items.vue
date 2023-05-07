<template>
  <NuxtLayout>
    <div class="w-full flex flex-col items-center pb-6">
      <div class="w-fit">
        <div class="w-full flex justify-between my-4">
          <div class="w-full mr-4">
            <Input
              :text="searchText"
              @update:text="onInputText"
              type="text"
              placeholder="検索ワードを入力してください"
              :required="false"
              :error="false"
            />
          </div>
          <Button text="検索する" type="primary" :onClick="handleSearch" />
        </div>
        <div class="grid grid-cols-3 gap-4">
          <ItemCard v-for="item in items" :item="item" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Input from "@/components/input/Input.vue";
import Button from "@/components/button/Button.vue";
import ItemCard from "@/components/item/ItemCard.vue";
import { collection, query, getDocs } from "firebase/firestore";
import { Item } from "~/composables/useItems";

const items = ref<Item[]>([]);
const searchText = ref("");

const { db } = useFirebase();

onMounted(async () => {
  try {
    const itemsSnapshot = await getDocs(query(collection(db, "items")));
    const itemsDocs = itemsSnapshot.docs;
    items.value = itemsDocs.map((itemDoc) => {
      const itemData = itemDoc.data() as Item;
      return {
        ...itemData,
        id: itemDoc.id,
      };
    });
  } catch (e) {
    console.log(e);
  }
});

const onInputText = (text: string) => {
  searchText.value = text;
};

const handleSearch = async () => {
  const itemsSnapshot = await getDocs(query(collection(db, "items")));
  const itemsDocs = itemsSnapshot.docs;
  items.value = itemsDocs
    .map((itemDoc) => {
      const item = itemDoc.data() as Item;
      return {
        ...item,
        id: itemDoc.id,
      };
    })
    .filter((item) => {
      return item.name.includes(searchText.value);
    });
};
</script>
