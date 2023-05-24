<template>
  <Teleport to="body">
    <div
      class="fixed top-[44px] left-0 right-0 bg-white shadow-md"
      v-show="open"
    >
      <div class="flex flex-col" v-if="logined">
        <div class="p-2">
          ようこそ、<span class="underline cursor-pointer" @click="goSetting">{{
            nickname
          }}</span
          >さん
        </div>
        <hr />
        <NuxtLink to="/items" class="p-2">商品を見る</NuxtLink>
        <hr />
        <NuxtLink to="/cart" class="p-2">カートを見る</NuxtLink>
        <hr />
        <div @click="checkSignOut" class="cursor-pointer p-2">ログアウト</div>
      </div>
      <div class="flex flex-col" v-else>
        <NuxtLink to="/sign_in" class="p-2">ログイン</NuxtLink>
        <hr />
        <NuxtLink to="/sign_up" class="p-2">新規登録</NuxtLink>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  open: boolean;
  logined: boolean;
  nickname: string;
  goSetting: () => void;
  checkSignOut: () => void;
}

const Props = withDefaults(defineProps<Props>(), {
  open: false,
  logined: false,
});
</script>
