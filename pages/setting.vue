<template>
  <NuxtLayout>
    <div class="flex justify-center">
      <div class="w-min">
        <h1 class="text-lg font-bold mt-6 mb-4 text-start">注文履歴</h1>
        <h1 class="text-lg font-bold mb-4">アカウント設定</h1>
        <div class="mb-4">
          <AccountSettingForm />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import AccountSettingForm from "@/components/forms/AccountSettingForm.vue";
import { getDocs, query, collection } from "firebase/firestore";

const { db } = useFirebase();
const { getUserId } = useAuth();

onMounted(async () => {
  const userId = getUserId();
  if (!userId) return;
  const receiptsSnapshot = await getDocs(
    query(collection(db, "users", userId, "receipts"))
  );
});
</script>
