<template>
  <div class="w-[540px] bg-white px-12 py-8">
    <h1 class="text-lg font-bold mb-4">ログイン</h1>
    <div class="mb-4">
      <TextForm
        label="メールアドレス"
        :text="email"
        @update:text="email = $event"
        type="email"
        placeholder="メールアドレスを入力してください"
        :required="false"
        :error="emailError"
        :errorMessage="emailErrorMessage"
      />
    </div>
    <div class="mb-4">
      <TextForm
        label="パスワード"
        :text="password"
        @update:text="password = $event"
        type="password"
        placeholder="パスワードを入力してください"
        :required="false"
        :error="passwordError"
        :errorMessage="passwordErrorMessage"
      />
    </div>
    <div class="">
      <Button text="ログイン" type="primary" :onClick="handleSignIn" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TextForm from "@/components/form/TextForm.vue";
import Button from "@/components/button/Button.vue";

const email = ref("");
const emailError = ref(false);
const emailErrorMessage = ref("");

const password = ref("");
const passwordError = ref(false);
const passwordErrorMessage = ref("");

const { signIn } = useAuth();

const handleSignIn = async () => {
  checkEmailValidation();
  checkPasswordValidation();
  if (emailError.value || passwordError.value) return;
  try {
    await signIn(email.value, password.value);
    await navigateTo("/items");
    window.alert("ログインしました");
  } catch (error) {
    if (!(error instanceof Error)) {
      window.alert("ログインに失敗しました");
      return;
    }
    if (error.message === "Firebase: Error (auth/user-not-found).") {
      window.alert("入力されたメールアドレスは存在しません");
    } else if (error.message === "Firebase: Error (auth/wrong-password).") {
      window.alert("パスワードが間違っています");
    }
  }
};

const checkEmailValidation = () => {
  const emailPattern =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
  if (email.value === "") {
    emailError.value = true;
    emailErrorMessage.value = "メールアドレスの入力は必須です";
  } else if (!emailPattern.test(email.value)) {
    emailError.value = true;
    emailErrorMessage.value = "メールアドレスの形式で入力してください";
  } else {
    emailError.value = false;
    emailErrorMessage.value = "";
  }
};

const checkPasswordValidation = () => {
  const passwordPattern = /^[a-zA-Z0-9.?/-]{8,}$/;
  if (!passwordPattern.test(password.value)) {
    passwordError.value = true;
    passwordErrorMessage.value =
      "パスワードを8文字以上の半角英数で入力してください";
  } else {
    passwordError.value = false;
    passwordErrorMessage.value = "";
  }
};
</script>
