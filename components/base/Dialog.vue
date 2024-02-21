<script lang="ts" setup>
const dialog = ref<HTMLDialogElement>();

const visible = ref(false);

const showModal = () => {
  dialog.value?.showModal();
  visible.value = true;
};

defineExpose({
  show: showModal,
  close: (returnVal?: string): void => dialog.value?.close(returnVal),
  visible,
});
</script>

<template>
  <dialog ref="dialog" @close="visible = false">
    <slot />
  </dialog>
</template>

<style>
dialog {
  position: absolute;
  overflow: hidden;
  display: grid;
  margin: auto;
  padding: 0;
  border-radius: 8px;
  background-color: var(--surface-default);
  box-shadow: 0 0 10px 0 var(--surface-shadow-bottom);
  width: min(360px, 80%);
}

dialog:not([open]) {
  pointer-events: none;
  opacity: 0;
}

dialog::backdrop {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(6px);
}
</style>
