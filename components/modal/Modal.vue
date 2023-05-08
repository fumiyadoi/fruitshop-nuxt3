<template>
  <Teleport to="body">
    <div
      class="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black opacity-50 flex flex-col justify-center items-center"
      v-show="open"
      @click="close"
    ></div>
    <div
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center items-center bg-white px-12 py-8"
      v-show="open"
    >
      <div class="w-full text-center mb-4">{{ content }}</div>
      <div class="flex justify-between items-center gap-3">
        <Button text="キャンセル" type="default" :onClick="close" />
        <Button :text="buttonText" type="primary" :onClick="handleClick" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  open: boolean;
  content: string;
  buttonText: string;
  onClick: () => void | Promise<void>;
}

const Props = withDefaults(defineProps<Props>(), {
  open: false,
  onClick: () => {},
});

const emits = defineEmits<{ (e: "update:open", text: boolean): void }>();

const close = () => {
  emits("update:open", false);
};

const handleClick = async () => {
  await Props.onClick();
  close();
};
</script>
