<template>
  <div class="text-sm mb-3">
    {{ label }}<span v-if="required" class="text-red-500">（必須）</span>
  </div>
  <div class="mb-3">
    <Input
      :text="text"
      @update:text="onInputText"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :error="error"
    />
  </div>
  <div class="text-sm text-red-500" v-if="error && !!errorMessage">
    {{ errorMessage }}
  </div>
</template>

<script setup lang="ts">
import Input from "@/components/input/Input.vue";

interface Props {
  label: string;
  text: string;
  type: "text" | "email" | "password";
  placeholder: string;
  required: boolean;
  error: boolean;
  errorMessage: string;
}

const Props = withDefaults(defineProps<Props>(), {
  label: "",
  text: "",
  type: "text",
  placeholder: "",
  required: false,
  error: false,
  errorMessage: "",
});

const emits = defineEmits<{ (e: "update:text", text: string): void }>();

const onInputText = (text: string) => {
  emits("update:text", text);
};
</script>
