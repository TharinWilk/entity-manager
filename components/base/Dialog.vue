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

onMounted(() => {
  dialog.value?.addEventListener("click", lightDismiss);
  dialog.value?.addEventListener("close", closeDialog);
});

const lightDismiss = ({ target: dialog }: any) => {
  if (dialog.nodeName === "DIALOG") dialog.close("dismiss");
};

const closeDialog = async ({ target: dialog }: any) => {
  dialog.setAttribute("inert", "");
  dialog.dispatchEvent(dialogClosingEvent);

  await animationsComplete(dialog);

  dialog.dispatchEvent(dialogClosedEvent);
};

const animationsComplete = (element: Element) => {
  return Promise.allSettled(
    element.getAnimations().map((animation) => {
      return animation.finished;
    })
  );
};
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

  transition: opacity 500ms ease;
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

html:has(dialog[open]) {
  overflow: hidden;
}

@media (prefers-reduced-motion: no-preference) {
  dialog {
    animation: scale-down forwards;
    animation-timing-function: ease;
  }

  dialog[open] {
    animation: slide-up forwards;
  }
}

@keyframes scale-down {
  100% {
    scale: 0;
  }
}

@keyframes scale-down {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
