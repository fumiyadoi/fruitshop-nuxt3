<template>
  <NuxtLayout>
    <div class="flex justify-center px-3">
      <div class="md:w-[768px] w-full">
        <h1 class="text-lg font-bold mt-6 mb-4 text-start">注文履歴</h1>
        <div class="flex flex-col gap-4 mb-8">
          <Receipt v-for="receipt in receipts" :receipt="receipt" />
        </div>
        <h1 class="text-lg font-bold mb-4">アカウント設定</h1>
        <div class="mb-8">
          <AccountSettingForm />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import AccountSettingForm from "@/components/forms/AccountSettingForm.vue";

const { receipts, getReceipts } = useReceipts();

onMounted(async () => {
  await getReceipts();
});
</script>
