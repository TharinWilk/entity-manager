<script setup lang="ts">
defineProps({
  prompt: {
    type: String,
    default: "Would you like to continue?",
  },
  confirm: {
    type: String,
    default: "Confirm",
  },
  cancel: {
    type: String,
    default: "Cancel",
  },
});

const emits = defineEmits(["submit"]);
</script>

<template>
  <form class="grid gap-8">
    <p class="text-center text-balance">{{ prompt }}</p>

    <div class="flex gap-4 justify-center">
      <BaseButton autofocus @click="emits('submit', false)" class="w-full">{{
        cancel
      }}</BaseButton>
      <BaseButton @click="emits('submit', true)" class="w-full">{{
        confirm
      }}</BaseButton>
    </div>
  </form>
</template>

<style></style>
