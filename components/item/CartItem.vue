<template>
  <div class="h-[240px] w-[784px] bg-white flex">
    <img
      src="@/assets/images/apple.png"
      class="object-cover h-full"
      alt="apple"
    />
    <div class="w-full flex flex-col justify-between m-6">
      <div class="flex justify-between items-center">
        <div class="text-lg">りんご</div>
        <div class="text-xl font-bold text-red-500">¥10,000</div>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="whitespace-nowrap">数量</div>
          <Select :item="count" :items="items" @update:item="count = $event" />
        </div>
        <Button text="カートから削除する" type="danger" :onClick="deleteItem" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import Select from "@/components/select/Select.vue";

const count = ref("1");
const items = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const deleteItem = async () => {
  window.alert("削除しました");
};
</script>
