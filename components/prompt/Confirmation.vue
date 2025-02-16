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
      <BaseButton autofocus class="w-full" @click="emits('submit', false)">{{
        cancel
      }}</BaseButton>
      <BaseButton class="w-full" @click="emits('submit', true)">{{
        confirm
      }}</BaseButton>
    </div>
  </form>
</template>

<style></style>
