<template>
  <NuxtLayout>
    <div
      class="h-[calc(100vh_-_44px)] flex flex-col justify-evenly items-center"
    >
      <h1 class="text-5xl font-bold leading-normal px-3">
        WELCOME TO FRUIT SHOP
      </h1>
      <img
        src="@/assets/images/top-image.png"
        class="object-cover h-1/2"
        alt="top-image"
      />
      <Button text="商品を見る" type="primary" :onClick="goItems" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { checkIsLogined } = useAuth();

const goItems = async () => {
  const logined = checkIsLogined();
  if (logined) {
    await navigateTo("/items");
  } else {
    await navigateTo("/sign_in");
  }
};
</script>
