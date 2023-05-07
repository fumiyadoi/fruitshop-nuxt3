<template>
  <input
    :value="text"
    @input="onInputText"
    :type="type"
    :class="inputClass"
    :placeholder="placeholder"
    :error="error"
  />
</template>

<script setup lang="ts">
interface Props {
  text: string;
  type: "text" | "email" | "password";
  placeholder: string;
  required: boolean;
  error: boolean;
}

const Props = withDefaults(defineProps<Props>(), {
  text: "",
  type: "text",
  placeholder: "",
  required: false,
  error: false,
});

const emits = defineEmits<{ (e: "update:text", text: string): void }>();

const inputClass = computed(() => {
  if (Props.error) {
    return "border border-red-500 placeholder-gray-400 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 block w-full p-2.5";
  } else {
    return "border border-gray-300 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5";
  }
});

const onInputText = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emits("update:text", target.value);
};
</script>
