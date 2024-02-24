<script lang="ts" setup>
const dialog = ref<HTMLDialogElement>();

// Dialog Visibility Logic
const visible = ref(false);

const showModal = () => {
  dialog.value?.showModal();
  visible.value = true;
};

// Exposed Functions
defineExpose({
  show: showModal,
  close: (returnVal?: string): void => dialog.value?.close(returnVal),
  visible,
});

// Set Active and Inactive Dialog State
watch(visible, (newValue) => {
  if (newValue) {
    // Dialog is opening
    if (!dialog.value) return;

    // Activate Dialog
    dialog.value.removeAttribute("inert");
    dialog.value.addEventListener("click", lightDismiss);

    // Set Focus
    setFocusOnAutofocusElement();
  } else {
    // Dialog is closing
    if (!dialog.value) return;

    // Inactivate Dialog
    dialog.value.setAttribute("inert", "");
    dialog.value.removeEventListener("click", lightDismiss);
  }
});

// Click outside dismissal
async function lightDismiss({ target: dialog }: any) {
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
}

// Wait for all dialog animations to complete their promises
async function animationsComplete(element: Element) {
  return Promise.allSettled(
    element.getAnimations().map((animation) => {
      return animation.finished;
    })
  );
}

// Set autoFocus if attribute found
function setFocusOnAutofocusElement() {
  const autofocusElement = dialog.value?.querySelector(
    "[autofocus]"
  ) as HTMLElement;

  if (autofocusElement) {
    autofocusElement.focus();
  }
}
</script>

<template>
  <dialog ref="dialog" @close="visible = false" inert>
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
