<template>
  <div class="w-[240px] bg-white">
    <img :src="item.image" class="object-cover w-full" alt="item-image" />
    <div class="mt-3 ml-3 mb-4">
      <div class="mb-3">{{ item.name }}</div>
      <div class="text-lg text-red-500 font-bold mb-3">
        ¥{{ item.price.toLocaleString() }}
      </div>
      <Button text="購入する" type="primary" :onClick="addCart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import { Item } from "~/composables/useItems";

interface Props {
  item: Item;
}

const Props = defineProps<Props>();

const { addItem } = useCartItems();

const addCart = async () => {
  addItem(Props.item);
  window.alert("カートに追加しました");
};
</script>
