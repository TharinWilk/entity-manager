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

const lightDismiss = async ({ target: dialog }: any) => {
  if (dialog.nodeName === "DIALOG") {
    // Set positioning
    dialog.style.top = "50%";
    dialog.style.transform = "translateY(-50%)";

    // Close Dialog and await animations
    dialog.close("dismiss");
    await animationsComplete(dialog);

    // Reset Styles
    dialog.style.top = "";
    dialog.style.transform = "";
  }
};

// wait for all dialog animations to complete their promises
const animationsComplete = (element: Element) => {
  return Promise.allSettled(
    element.getAnimations().map((animation) => {
      return animation.finished;
    })
  );
};

onMounted(async () => {
  if (!dialog.value) return;

  dialog.value?.addEventListener("click", lightDismiss);
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

  transition: opacity 300ms ease;
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
    animation: scale-down forwards 500ms;
    animation-timing-function: ease-in-out;
  }

  dialog[open] {
    animation: slide-in-up forwards 300ms ease;
    /* border: 2px red solid; */
  }
}

@keyframes scale-down {
  100% {
    scale: 0;
  }
}

@keyframes slide-in-up {
  0% {
    transform: translateY(50%);
  }
}
</style>
