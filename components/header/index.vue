<script setup lang="ts">
const { toggleTheme, themeColor } = useTheme();
</script>

<template>
  <header class="header text-2xl text-center p-3 border-color flex justify-end">
    <BaseButton size="xs" class="w-8 h-8" @click="toggleTheme">
      <span class="sr-only">Toggle Color Theme: {{ themeColor }}</span>
      <Icon name="mdi:sun-moon-stars" :color="themeColor" size="24" />
    </BaseButton>
  </header>
</template>

<style scoped>
.header {
  --border-color: var(--surface-darkened);

  border-bottom: 1px solid var(--border-color);
}

[data-theme="light"] .header {
  --border-color: var(--surface-darkened);
}

[data-theme="dark"] .header {
  --border-color: var(--surface-dark-lightened);
}
</style>
