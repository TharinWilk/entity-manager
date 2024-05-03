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
  <form class="grid gap-3">
    <p>{{ prompt }}</p>

    <div class="flex gap-4 justify-center">
      <BaseButton @click="emits('submit', false)">{{ cancel }}</BaseButton>
      <BaseButton @click="emits('submit', true)">{{ confirm }}</BaseButton>
    </div>
  </form>
</template>

<style></style>
