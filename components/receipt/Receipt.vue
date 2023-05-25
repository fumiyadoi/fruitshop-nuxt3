<template>
  <div class="w-full bg-white">
    <div class="flex gap-3 ml-6 my-4">
      <div class="">
        <div class="mb-2">注文日</div>
        <div class="">{{ date }}</div>
      </div>
      <div class="">
        <div class="mb-2">合計</div>
        <div class="">¥{{ sumPrice }}</div>
      </div>
    </div>
    <hr />
    <div class="ml-8 my-6 flex flex-col gap-4">
      <div
        v-for="item in receipt.items"
        class="flex gap-4 md:h-[160px] h-[120px]"
      >
        <img :src="item.image" class="object-cover h-full" alt="item-image" />
        <div class="flex flex-col gap-3 mt-4">
          <div class="text-lg font-bold">{{ item.name }}</div>
          <div class="">金額：¥{{ item.price.toLocaleString() }}</div>
          <div class="">個数：{{ item.count.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Receipt } from "~/composables/useReceipts";
import dayjs from "dayjs";

interface Props {
  receipt: Receipt;
}

const Props = defineProps<Props>();

const date = computed(() =>
  dayjs(Props.receipt.createdAt).format("YYYY年M月D日")
);

const sumPrice = computed(() => {
  return Props.receipt.items.reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);
});
</script>
