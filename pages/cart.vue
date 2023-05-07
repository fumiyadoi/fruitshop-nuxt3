<template>
  <NuxtLayout>
    <div class="w-full flex flex-col items-center py-6">
      <div class="w-fit flex flex-col gap-4">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import CartItem from "@/components/item/CartItem.vue";
</script>
