<script setup lang="ts">
const { themeColor } = useTheme();

const managerStore = useManagerStore();
const { managers } = storeToRefs(managerStore);

const modal = ref<HTMLDialogElement>();
const isOpen = ref(false);
const click = () => {
  isOpen.value = !isOpen.value;
  modal.value?.show();
};
</script>

<template>
  <section class="sidebar-nav border-color">
    <BaseButton size="xs" @click="click">
      <span class="sr-only">Add</span>
      <Icon name="mdi:plus" size="24" :color="themeColor" />
    </BaseButton>
    <BaseButton v-for="manager in managers" size="xs" @click="navigateTo('/')">
      <span class="sr-only">{{ manager.name }}</span>
      <Icon :name="`mdi:${manager.icon}`" size="24" :color="themeColor" />
    </BaseButton>
  </section>

  <!-- Create Manager Modal -->
  <ClientOnly>
    <Teleport to="#content">
      <LazyBaseDialog ref="modal">
        <ModalContentAddManager />
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
