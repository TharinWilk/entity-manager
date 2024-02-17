<script setup lang="ts">
const { theme, themeColor } = useTheme();
</script>

<template>
  <section class="sidebar-nav border-color">
    <BaseButton size="xs">
      <span class="sr-only">Add</span>
      <Icon name="mdi:plus" size="24" :color="themeColor" />
    </BaseButton>
    <BaseButton size="xs">
      <span class="sr-only">Add</span>
      <Icon name="mdi:house" size="24" :color="themeColor" />
      <nuxt-link to="/" />
    </BaseButton>
  </section>
</template>

<style scoped>
.sidebar-nav {
  --border-color: var(--surface-darkened);

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.75rem;

  background-color: var(--surface-default);
  border-right: 1px solid var(--border-color);
}

[data-theme="light"] .border-color {
  --border-color: var(--surface-darkened);
}

[data-theme="dark"] .border-color {
  --border-color: var(--surface-dark-lightened);
}
</style>
