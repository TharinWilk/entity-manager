<script setup lang="ts">
// Manager Store Logic
const managerStore = useManagerStore();
const { managers } = storeToRefs(managerStore);

// Handle Dialog Logic
const modal = ref<HTMLDialogElement>();
const click = () => {
  modal.value?.show();
};

// Icon Color Logic
const { themeColor } = useTheme();
</script>

<template>
  <section class="sidebar-nav border-color">
    <!-- Activate Add Manager Modal Button -->
    <BaseButton size="xs" @click="click">
      <span class="sr-only">Add</span>
      <Icon name="mdi:plus" size="24" :color="themeColor" />
    </BaseButton>

    <!-- Manager Icon Buttons -->
    <BaseButton
      v-for="manager in managers"
      size="xs"
      @click="managerStore.setActiveManager(manager.name)"
    >
      <span class="sr-only">{{ manager.name }}</span>
      <Icon :name="`mdi:${manager.icon}`" size="24" :color="themeColor" />
    </BaseButton>
  </section>

  <!-- Create Manager Modal -->
  <ClientOnly>
    <Teleport to="#layout">
      <LazyBaseDialog ref="modal" title="Create New Manager">
        <FormAddManager :dialog="modal" />
      </LazyBaseDialog>
    </Teleport>
  </ClientOnly>
  <!-- Create Manager Modal End -->
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
