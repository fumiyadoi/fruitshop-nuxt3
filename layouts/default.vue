<template>
  <div class="bg-gray-100">
    <Navbar :logined="logined" :nickname="nickname" />
    <div class="min-h-[calc(100vh_-_44px)]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";
import { getDoc, doc } from "firebase/firestore";

const logined = ref(false);
const nickname = ref("");

const route = useRoute();
const { checkIsLogined, getUserId } = useAuth();
const { db } = useFirebase();

onMounted(async () => {
  logined.value = checkIsLogined();
  if (
    !logined.value &&
    route.path !== "/" &&
    route.path !== "/sign_in" &&
    route.path !== "/sign_up"
  ) {
    await navigateTo("/");
    return;
  }
  const userId = getUserId();
  if (userId) {
    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.data();
    nickname.value = userData?.nickname ?? "";
  }
});
</script>
