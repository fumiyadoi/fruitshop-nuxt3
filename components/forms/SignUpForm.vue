<template>
  <div class="w-[540px] bg-white px-12 py-8">
    <h1 class="text-lg font-bold mb-4">新規登録</h1>
    <div class="mb-4">
      <TextForm
        label="ニックネーム"
        :text="nickname"
        @update:text="nickname = $event"
        type="text"
        placeholder="ニックネームを入力してください"
        required
        :error="nicknameError"
        :errorMessage="nicknameErrorMessage"
      />
    </div>
    <div class="mb-4">
      <TextForm
        label="メールアドレス"
        :text="email"
        @update:text="email = $event"
        type="email"
        placeholder="メールアドレスを入力してください"
        required
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
        required
        :error="passwordError"
        :errorMessage="passwordErrorMessage"
      />
    </div>
    <div class="">
      <Button text="新規登録" type="primary" :onClick="handleSignUp" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TextForm from "@/components/form/TextForm.vue";
import Button from "@/components/button/Button.vue";

const nickname = ref("");
const nicknameError = ref(false);
const nicknameErrorMessage = ref("");

const email = ref("");
const emailError = ref(false);
const emailErrorMessage = ref("");

const password = ref("");
const passwordError = ref(false);
const passwordErrorMessage = ref("");

const { signUp } = useAuth();
const { createUser } = useUser();

const handleSignUp = async () => {
  checkNicknameValidation();
  checkEmailValidation();
  checkPasswordValidation();
  if (nicknameError.value || emailError.value || passwordError.value) return;
  try {
    const credential = await signUp(email.value, password.value);
    await createUser(credential.user.uid, nickname.value);
    await navigateTo("/items");
    window.alert("新規登録しました");
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Firebase: Error (auth/email-already-in-use)."
    ) {
      window.alert("既に登録されているメールアドレスです");
    } else {
      window.alert("新規登録に失敗しました");
    }
  }
};

const checkNicknameValidation = () => {
  if (nickname.value === "") {
    nicknameError.value = true;
    nicknameErrorMessage.value = "ニックネームの入力は必須です";
  } else if (nickname.value.length > 20) {
    nicknameError.value = true;
    nicknameErrorMessage.value = "ニックネームは20文字以内で入力してください";
  } else {
    nicknameError.value = false;
    nicknameErrorMessage.value = "";
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
