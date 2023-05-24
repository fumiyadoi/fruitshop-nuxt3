<template>
  <nav class="bg-gray-700 text-white">
    <div class="flex justify-between px-3 py-2">
      <NuxtLink to="/" class="text-xl font-bold">FruitShop</NuxtLink>
      <div class="md:block hidden">
        <div class="flex gap-3" v-if="logined">
          <div class="">
            ようこそ、<span
              class="underline cursor-pointer"
              @click="goSetting"
              >{{ nickname }}</span
            >さん
          </div>
          <NuxtLink to="/items" class="">商品を見る</NuxtLink>
          <NuxtLink to="/cart" class="">カートを見る</NuxtLink>
          <div @click="checkSignOut" class="cursor-pointer">ログアウト</div>
        </div>
        <div class="flex gap-3" v-else>
          <NuxtLink to="/sign_in" class="">ログイン</NuxtLink>
          <NuxtLink to="/sign_up" class="">新規登録</NuxtLink>
        </div>
      </div>
      <div class="block md:hidden" :onClick="toggleMenu">
        <component
          class="w-7 h-7"
          :is="icons.xMark"
          v-if="openMenu"
        ></component>
        <component class="w-7 h-7" :is="icons.bars3" v-else></component>
      </div>
    </div>
  </nav>
  <Modal
    :open="openLogoutModal"
    @update:open="openLogoutModal = $event"
    content="ログアウトしますか？"
    buttonText="ログアウト"
    :onClick="handleSignOut"
  />
  <Menu
    :open="openMenu"
    :logined="logined"
    :nickname="nickname"
    :goSetting="goSetting"
    :checkSignOut="checkSignOut"
  />
</template>

<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/solid";

interface Props {
  logined: boolean;
  nickname: string;
}

const Props = withDefaults(defineProps<Props>(), {
  logined: false,
  nickname: "",
});

const openMenu = ref(false);
const openLogoutModal = ref(false);

const icons = reactive({
  bars3: Bars3Icon,
  xMark: XMarkIcon,
});

const { signOut } = useAuth();

const checkSignOut = () => {
  openLogoutModal.value = true;
};

const toggleMenu = () => {
  openMenu.value = !openMenu.value;
};

const handleSignOut = async () => {
  await signOut();
  await navigateTo("/");
  window.alert("ログアウトしました");
};

const goSetting = async () => {
  await navigateTo("/setting");
};
</script>
