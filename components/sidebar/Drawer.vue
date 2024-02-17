<script setup lang="ts">
const isOpen = ref(true);

const { themeColor } = useTheme();
</script>

<template>
  <section
    :class="
      isOpen
        ? 'md:grid-cols-[1fr] translate-x-0'
        : 'md:grid-cols-[0fr] -translate-x-full md:translate-x-0'
    "
    class="sidebar-drawer motion-safe:duration-500 flex md:grid -z-10 absolute md:relative left-full md:left-auto bg-[var(--surface-default)]"
  >
    <div class="overflow-hidden">
      <div class="p-4">
        <BaseInput placeholder="Search" />
      </div>
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

  height: 100%;
  gap: 1rem;

  border-right: 1px solid var(--border-color);

  transition: grid-template-columns 500ms, transform 500ms;
}

[data-theme="light"] .sidebar-drawer {
  --border-color: var(--surface-darkened);
}

[data-theme="dark"] .sidebar-drawer {
  --border-color: var(--surface-dark-lightened);
}
</style>
