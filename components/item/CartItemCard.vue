<template>
  <div class="md:h-[240px] h-[120px] w-full bg-white flex">
    <img :src="cartItem.image" class="object-cover h-full" alt="apple" />
    <div class="w-full flex flex-col justify-between m-6">
      <div class="flex justify-between items-center">
        <div class="text-lg">{{ cartItem.name }}</div>
        <div class="text-xl font-bold text-red-500">
          ¥{{ cartItem.price.toLocaleString() }}
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="whitespace-nowrap">数量</div>
          <Select
            :item="cartItem.count.toString()"
            :items="items"
            @update:item="(item) => onChangeSelect(item, cartItem.id)"
          />
        </div>
        <Button
          text="削除する"
          type="danger"
          :onClick="() => deleteItem(cartItem.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CartItem } from "~/composables/useCartItems";

const { changeCount, deleteItem } = useCartItems();

interface Props {
  cartItem: CartItem;
}

const Props = defineProps<Props>();

const items = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const onChangeSelect = (item: string, id: string) => {
  changeCount(id, Number(item));
};
</script>
