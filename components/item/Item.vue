<template>
  <div class="w-[240px] bg-white">
    <img
      src="@/assets/images/apple.png"
      class="object-cover w-full"
      alt="apple"
    />
    <div class="mt-3 ml-3 mb-4">
      <div class="mb-3">りんご</div>
      <div class="text-lg text-red-500 font-bold mb-3">¥10,000</div>
      <Button text="購入する" type="primary" :onClick="purchase" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/button/Button.vue";

const purchase = async () => {
  window.alert("購入しました");
};
</script>
