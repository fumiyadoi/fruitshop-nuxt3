<template>
  <div class="w-full bg-white px-12 py-8">
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
    <div class="mb-6">
      <Button
        text="パスワードを変更する"
        type="primary"
        :onClick="handleChangePassword"
      />
    </div>
    <div class="">
      <Button text="退会する" type="danger" :onClick="checkDeleteAccount" />
    </div>
  </div>
  <Modal
    :open="open"
    @update:open="open = $event"
    content="退会しますか？"
    buttonText="退会する"
    :onClick="deleteAccount"
  />
</template>

<script setup lang="ts">
import TextForm from "@/components/form/TextForm.vue";
import Button from "@/components/button/Button.vue";

const open = ref(false);

const nickname = ref("");
const nicknameError = ref(false);
const nicknameErrorMessage = ref("");

const password = ref("");
const passwordError = ref(false);
const passwordErrorMessage = ref("");

const { changePassword, deleteAuth } = useAuth();
const { changeNickname, deleteUser } = useUser();

const handleChangeNickname = async () => {
  checkNicknameValidation();
  if (nicknameError.value) return;
  try {
    await changeNickname(nickname.value);
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
  } else if (nickname.value.length > 20) {
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

const checkDeleteAccount = () => {
  open.value = true;
};

const deleteAccount = async () => {
  try {
    await deleteUser();
    await deleteAuth();
    window.alert("退会しました");
  } catch (error) {
    window.alert("退会に失敗しました");
  }
};
</script>
