<script setup lang="ts">
const { toggleTheme, themeColor } = useTheme();
</script>

<template>
  <header
    class="text-2xl text-center p-2 border-b border-[var(--surface-lightened)]"
  >
    <BaseButton size="xs" class="w-8 h-8" @click="toggleTheme">
      <Icon name="mdi:sun-moon-stars" :color="themeColor" size="24" />
    </BaseButton>
  </header>
</template>

<style></style>
