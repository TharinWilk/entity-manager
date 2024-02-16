<script setup lang="ts">
const { themeColor } = useTheme();
</script>

<template>
  <section class="sidebar-nav">
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

<style>
.sidebar-nav {
  --border-color: var(--surface-darkened);

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.75rem;

  border-right: 1px solid var(--border-color);
}

@media (prefers-color-scheme: dark) {
  .sidebar-nav {
    --border-color: var(--surface-lightened);
  }
}
</style>
