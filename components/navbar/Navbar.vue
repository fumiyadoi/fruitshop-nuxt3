<template>
  <nav class="bg-gray-700 text-white">
    <div class="flex justify-between px-3 py-2">
      <NuxtLink to="/" class="text-xl font-bold">FruitShop</NuxtLink>
      <div class="flex gap-3" v-if="logined">
        <div class="">ようこそ、ゲストさん</div>
        <NuxtLink to="/items" class="">商品を見る</NuxtLink>
        <NuxtLink to="/cart" class="">カートを見る</NuxtLink>
        <div @click="handleSignOut" class="cursor-pointer">ログアウト</div>
      </div>
      <div class="flex gap-3" v-else>
        <NuxtLink to="/sign_in" class="">ログイン</NuxtLink>
        <NuxtLink to="/sign_up" class="">新規登録</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  logined: boolean;
}

const Props = withDefaults(defineProps<Props>(), {
  logined: false,
});

const { signOut } = useAuth();

const handleSignOut = async () => {
  await signOut();
  await navigateTo("/");
  window.alert("ログアウトしました");
};
</script>
