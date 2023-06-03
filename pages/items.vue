<template>
  <NuxtLayout>
    <div class="w-full flex flex-col items-center pb-8">
      <div class="max-w-[768px] px-3">
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
        <div class="grid md:grid-cols-3 grid-cols-2 gap-4">
          <ItemCard v-for="item in items" :item="item" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const searchText = ref("");

const { items, getItems, searchItems } = useItems();

onMounted(async () => {
  try {
    await getItems();
  } catch (e) {
    console.log(e);
  }
});

const onInputText = (text: string) => {
  searchText.value = text;
};

const handleSearch = async () => {
  await searchItems(searchText.value);
};
</script>
