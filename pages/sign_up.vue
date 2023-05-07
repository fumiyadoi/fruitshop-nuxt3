<template>
  <NuxtLayout>
    <div
      class="h-[calc(100vh_-_44px)] flex flex-col justify-center items-center"
    >
      <SignUpForm />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import SignUpForm from "@/components/forms/SignUpForm.vue";
</script>
