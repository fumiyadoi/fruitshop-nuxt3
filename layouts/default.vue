<template>
  <div class="bg-gray-100">
    <Navbar :logined="logined" />
    <div class="min-h-[calc(100vh_-_44px)]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";

const logined = ref(false);

const route = useRoute();
const { checkIsLogined } = useAuth();

onMounted(async () => {
  logined.value = await checkIsLogined();
  if (
    route.path === "/" ||
    route.path === "/sign_up" ||
    route.path === "/sign_in"
  )
    return;
  if (!logined.value) {
    await navigateTo("/");
  }
});
</script>
