<template>
  <h1>新規登録</h1>
  <div>
    <input type="text" v-model="email" />
    <input type="text" v-model="password" />
  </div>
  <div>
    <button type="button" @click="handleSignUp">新規登録する</button>
  </div>
</template>

<script setup>
const email = ref("");
const password = ref("");

const handleSignUp = async () => {
  const { signUp } = useAuth();
  try {
    await signUp(email.value, password.value);
  } catch (error) {
    window.alert("登録に失敗しました");
  }
};
</script>
