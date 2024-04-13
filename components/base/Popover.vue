<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
});

const dialog = ref<HTMLDialogElement>();

// Dialog Visibility Logic
const visible = ref(false);

const show = () => {
  dialog.value?.show();
  visible.value = true;
};

// Exposed Functions
defineExpose({
  show,
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
    setTimeout(() => {
      window.addEventListener("click", lightDismiss);
    }, 100);

    // Set Focus
    setFocusOnAutofocusElement();
  } else {
    // Dialog is closing
    if (!dialog.value) return;

    // Inactivate Dialog
    dialog.value.setAttribute("inert", "");
    window.removeEventListener("click", lightDismiss);
  }
});

// Click outside dismissal
async function lightDismiss({ target }: any) {
  if (target.closest("dialog")) return;

  dialog.value?.close("dismiss");
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
  <dialog ref="dialog" @close="visible = false" v-bind="$attrs" inert>
    <div
      class="px-8 py-4 grid rounded-lg w-full gap-10 max-h-dvh overflow-hidden"
    >
      <slot />
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  position: absolute;
  overflow: hidden;
  display: grid;
  margin: auto;
  padding: 0;
  border-radius: 8px;
  background-color: var(--surface-default);
  box-shadow: 0 0 10px 0 var(--surface-shadow-bottom);
  width: min(fit-content, 80%);

  transition: opacity 300ms ease;
}

dialog:not([open]) {
  pointer-events: none;
  opacity: 0;
}

@media (prefers-reduced-motion: no-preference) {
  dialog {
    animation: scale-down forwards 500ms;
    animation-timing-function: ease-in-out;
  }

  dialog[open] {
    animation: slide-in-up forwards 300ms ease;
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
