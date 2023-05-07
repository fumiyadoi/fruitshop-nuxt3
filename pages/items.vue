<template>
  <NuxtLayout>
    <div class="w-full flex flex-col items-center pb-6">
      <div class="w-fit">
        <div class="w-full flex justify-between my-4">
          <div class="w-full mr-4">
            <Input
              :text="searchText"
              @update:text="onInputText"
              type="text"
              placeholder="検索ワードを入力してください"
              :required="false"
              :error="false"
            />
          </div>
          <Button text="検索する" type="primary" :onClick="handleSearch" />
        </div>
        <div class="grid grid-cols-3 gap-4">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Input from "@/components/input/Input.vue";
import Button from "@/components/button/Button.vue";

const searchText = ref("");

const onInputText = (text: string) => {
  searchText.value = text;
};

const handleSearch = () => {
  console.log(searchText.value);
};
</script>
