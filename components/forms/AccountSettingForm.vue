<template>
  <div class="w-[784px] bg-white px-12 py-8">
    <div class="mb-4">
      <TextForm
        label="ニックネーム"
        :text="nickname"
        @update:text="nickname = $event"
        type="text"
        placeholder="ニックネームを入力してください"
        :required="false"
        :error="nicknameError"
        :errorMessage="nicknameErrorMessage"
      />
    </div>
    <div class="mb-6">
      <Button
        text="ニックネームを変更する"
        type="primary"
        :onClick="handleChangeNickname"
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
      <Button
        text="パスワードを変更する"
        type="primary"
        :onClick="handleChangePassword"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TextForm from "@/components/form/TextForm.vue";
import Button from "@/components/button/Button.vue";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "~/composables/useAuth";
import { useFirebase } from "~/composables/useFirebase";

const nickname = ref("");
const nicknameError = ref(false);
const nicknameErrorMessage = ref("");

const password = ref("");
const passwordError = ref(false);
const passwordErrorMessage = ref("");

const { getUserId, changePassword } = useAuth();
const { db } = useFirebase();

const handleChangeNickname = async () => {
  checkNicknameValidation();
  if (nicknameError.value) return;
  try {
    const userId = await getUserId();
    if (!userId) {
      window.alert("ユーザーIDが取得できませんでした");
      return;
    }
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      nickname: nickname.value,
    });
    await navigateTo("/items");
    window.alert("ニックネームを変更しました");
  } catch (error) {
    window.alert("ニックネームの変更に失敗しました");
  }
};

const handleChangePassword = async () => {
  checkPasswordValidation();
  if (passwordError.value) return;
  try {
    await changePassword(password.value);
    window.alert("パスワードを変更しました");
  } catch (error) {
    window.alert("パスワードの変更に失敗しました");
  }
};

const checkNicknameValidation = () => {
  if (nickname.value === "") {
    nicknameError.value = true;
    nicknameErrorMessage.value = "ニックネームの入力は必須です";
  }
  if (nickname.value.length > 20) {
    nicknameError.value = true;
    nicknameErrorMessage.value = "ニックネームは20文字以内で入力してください";
  } else {
    nicknameError.value = false;
    nicknameErrorMessage.value = "";
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
