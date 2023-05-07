<template>
  <select
    class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    @change="onSelectItem"
  >
    <option v-for="item in items" :selected="selected(item)">{{ item }}</option>
  </select>
</template>

<script setup lang="ts">
interface Props {
  item: string;
  items: string[];
}

const Props = withDefaults(defineProps<Props>(), {
  item: "",
  items: () => [],
});

const selected = (i: string) => {
  return Props.item === i;
};

const emits = defineEmits<{ (e: "update:item", item: string): void }>();

const onSelectItem = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emits("update:item", target.value);
};
</script>
