<template>
  <button :class="buttonClass" @click="onClick">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  onClick: () => void;
  type: "default" | "primary" | "danger";
}

const Props = withDefaults(defineProps<Props>(), {
  text: "",
  onClick: () => {},
  type: "default",
});

const buttonClass = computed(() => {
  if (Props.type === "default") {
    return "bg-white py-2 px-3 rounded";
  } else if (Props.type === "primary") {
    return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded whitespace-nowrap";
  } else if (Props.type === "danger") {
    return "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded whitespace-nowrap";
  }
});
</script>
