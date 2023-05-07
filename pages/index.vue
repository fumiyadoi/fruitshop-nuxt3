<template>
  <NuxtLayout>
    <div
      class="h-[calc(100vh_-_44px)] bg-black flex flex-col justify-evenly items-center text-white"
    >
      <h1 class="text-5xl font-bold">WELCOME TO FRUIT SHOP</h1>
      <img
        src="@/assets/images/top-image.png"
        class="object-cover h-[70%]"
        alt="top-image"
      />
      <div class="underline cursor-pointer text-lg" @click="goItems">
        商品を見る
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { checkIsLogined } = useAuth();

const goItems = async () => {
  const logined = await checkIsLogined();
  if (logined) {
    await navigateTo("/items");
  } else {
    await navigateTo("/sign_in");
  }
};
</script>
