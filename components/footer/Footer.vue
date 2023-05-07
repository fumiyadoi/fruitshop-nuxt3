<template>
  <footer class="bg-white">
    <div class="flex justify-center items-center gap-3 py-2">
      <div class="text-lg font-bold">
        小計：{{ calculateTotalPrice().toLocaleString() }}円（{{
          calculateTotalCount().toLocaleString()
        }}個の商品）
      </div>
      <Button text="購入する" type="primary" :onClick="purchase" />
    </div>
  </footer>
</template>

<script setup lang="ts">
interface Props {
  logined: boolean;
}

const Props = withDefaults(defineProps<Props>(), {
  logined: false,
});

const { calculateTotalCount, calculateTotalPrice } = useCartItems();

const purchase = async () => {
  window.alert("購入しました");
};
</script>
