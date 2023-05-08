<template>
  <button :class="buttonClass" @click="onClick" :disabled="disabled">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  onClick: () => void | Promise<void>;
  type: "default" | "primary" | "danger";
  disabled: boolean;
}

const Props = withDefaults(defineProps<Props>(), {
  text: "",
  onClick: () => {},
  type: "default",
  disabled: false,
});

const buttonClass = computed(() => {
  if (Props.disabled) {
    return "bg-gray-300 text-white font-bold py-2 px-3 rounded whitespace-nowrap";
  }
  if (Props.type === "default") {
    return "bg-white py-2 px-3 border border-gray-300 rounded";
  } else if (Props.type === "primary") {
    return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded whitespace-nowrap";
  } else if (Props.type === "danger") {
    return "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded whitespace-nowrap";
  }
});
</script>
