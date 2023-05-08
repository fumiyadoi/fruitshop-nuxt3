<template>
  <footer class="bg-white">
    <div class="flex justify-center items-center gap-3 py-2">
      <div class="text-lg font-bold">
        小計：￥{{ calculateTotalPrice().toLocaleString() }}（{{
          calculateTotalCount().toLocaleString()
        }}個の商品）
      </div>
      <Button
        text="購入する"
        type="primary"
        :onClick="checkPurchase"
        :disabled="calculateTotalCount() === 0"
      />
    </div>
  </footer>
  <Modal
    :open="open"
    @update:open="open = $event"
    content="購入しますか？"
    buttonText="購入する"
    :onClick="purchaseItems"
  />
</template>

<script setup lang="ts">
const open = ref(false);

const { purchaseItems, calculateTotalCount, calculateTotalPrice } =
  useCartItems();

const checkPurchase = () => {
  open.value = true;
};
</script>
