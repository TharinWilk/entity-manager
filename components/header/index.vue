<script setup lang="ts">
const { toggleTheme, themeColor } = useTheme();

const managerStore = useManagerStore();

const modal = ref();
const modalContent = ref<string>();
function updateModalContent(content: string) {
  modalContent.value = content;
}

function handleConfirmationResponse(response: boolean) {
  // Response is falsy - close modal
  if (!response) {
    modal.value.close();
    return;
  }

  // Response is truthy - delete manager - close modal
  deleteManager();
  modal.value.close();
}

function deleteManager() {
  // Guard - No active manager
  if (!managerStore.getActiveManager) {
    throw Error("Manager could not be deleted. No active manager found");
  }

  // Find index of active manager - remove manager
  const indexOfActiveManager = managerStore.getManagerIndex(
    managerStore.getActiveManager
  );
  managerStore.removeManager(indexOfActiveManager);
}
</script>

<template>
  <header
    class="header text-2xl text-center p-3 border-color flex"
    :class="managerStore.getActiveManager ? 'justify-between' : 'justify-end'"
  >
    <!-- Manger Buttons -->
    <transition name="fade">
      <ul v-if="managerStore.getActiveManager" class="flex gap-2">
        <li>
          <BaseButton
            size="xs"
            class="w-8 h-8"
            @click="managerStore.downloadManager"
          >
            <span class="sr-only">Download Manager</span>
            <Icon
              name="mdi:file-download-outline"
              :color="themeColor"
              size="24"
            />
            <BaseTooltip bottom
              >Download
              {{ managerStore.getActiveManager.name }} Manager</BaseTooltip
            >
          </BaseButton>
        </li>
        <li>
          <BaseButton
            size="xs"
            class="w-8 h-8"
            @click="updateModalContent('edit'), modal.show()"
          >
            <span class="sr-only">Edit Manager</span>
            <Icon
              name="mdi:text-box-edit-outline"
              :color="themeColor"
              size="24"
            />
            <BaseTooltip bottom
              >Edit
              {{ managerStore.getActiveManager.name }} Manager</BaseTooltip
            >
          </BaseButton>
        </li>
        <li>
          <BaseButton
            size="xs"
            class="w-8 h-8"
            @click="updateModalContent('delete'), modal.show()"
          >
            <span class="sr-only">Delete Manager</span>
            <Icon name="mdi:trash-outline" :color="themeColor" size="24" />
            <BaseTooltip bottom
              >Delete
              {{ managerStore.getActiveManager.name }} Manager</BaseTooltip
            >
          </BaseButton>
        </li>
      </ul>
    </transition>

    <!-- Application Buttons -->
    <ul>
      <li>
        <BaseButton size="xs" class="w-8 h-8" @click="toggleTheme">
          <span class="sr-only">Toggle Color Theme: {{ themeColor }}</span>
          <Icon name="mdi:sun-moon-stars" :color="themeColor" size="24" />
        </BaseButton>
      </li>
    </ul>
  </header>

  <ClientOnly>
    <Teleport to="#layout">
      <LazyBaseDialog ref="modal" :has-header="false" class="z-10">
        <FormEditManager v-if="modalContent == 'edit'" :dialog="modal" />
        <LazyPromptConfirmation
          v-else
          @submit="handleConfirmationResponse"
          :prompt="`Are you sure you want to delete ${managerStore.getActiveManager?.name}?`"
          confirm="Delete"
        />
      </LazyBaseDialog>
    </Teleport>
  </ClientOnly>
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
