<script setup lang="ts">
const isOpen = ref(true);

const { themeColor } = useTheme();
</script>

<template>
  <section
    :class="isOpen ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'"
    class="sidebar-drawer motion-safe:duration-500"
  >
    <div class="overflow-hidden">
      <p class="p-10">Drawer</p>
    </div>
  </section>

  <BaseButton
    size="xs"
    class="absolute w-8 h-8 !rounded-full left-full -translate-x-4 top-1/2 -translate-y-1/2"
    @click="isOpen = !isOpen"
  >
    <Icon
      name="mdi:chevron-right"
      :color="themeColor"
      size="24"
      :class="{ 'rotate-180': isOpen }"
    />
  </BaseButton>
</template>

<style scoped>
.sidebar-drawer {
  --border-color: var(--surface-darkened);

  position: relative;
  display: grid;
  height: 100%;
  gap: 1rem;

  border-right: 1px solid var(--border-color);

  transition: grid-template-columns 500ms;
}

[data-theme="light"] .sidebar-drawer {
  --border-color: var(--surface-darkened);
}

[data-theme="dark"] .sidebar-drawer {
  --border-color: var(--surface-dark-lightened);
}
</style>
