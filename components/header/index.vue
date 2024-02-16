<script setup lang="ts">
const { toggleTheme, userPreference } = useUserTheme();

const themePreference = computed(() => {
  return userPreference.value === "dark" ? "black" : "white";
});
</script>

<template>
  <header
    class="text-2xl text-center p-2 border-b border-[var(--surface-lightened)] duration-[300ms]"
  >
    <BaseButton size="xs" class="w-8 h-8" @click="toggleTheme">
      <Icon
        name="mdi:sun-moon-stars"
        color="white"
        size="24"
        :class="{ 'rotate-180': isOpen }"
      />
    </BaseButton>
  </header>
</template>

<style></style>
