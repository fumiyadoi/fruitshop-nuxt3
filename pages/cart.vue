<template>
  <NuxtLayout>
    <div class="relative">
      <div class="flex flex-col items-center pt-6 pb-20">
        <div class="md:w-[768px] w-full flex flex-col gap-4 px-3">
          <CartItemCard v-for="itemCount in cartItems" :itemCount="itemCount" />
        </div>
      </div>
      <div class="bottom-0 left-0 right-0 fixed">
        <Footer />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import CartItemCard from "@/components/item/CartItemCard.vue";
import Footer from "@/components/footer/Footer.vue";

const { cartItems } = useCartItems();
</script>
