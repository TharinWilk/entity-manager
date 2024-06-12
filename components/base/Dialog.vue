<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  hasHeader: {
    type: Boolean,
    default: true,
  },
});

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
    dialog.close("dismiss");
  }
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

// Set Icon Color
const { themeColor } = useTheme();
</script>

<template>
  <dialog ref="dialog" @close="visible = false" v-bind="$attrs" inert>
    <section
      class="px-8 py-4 grid rounded-lg w-full gap-10 max-h-dvh overflow-hidden"
    >
      <!-- Header Section -->
      <header
        v-if="hasHeader"
        class="flex justify-between items-center border-b-2 border-white pb-4"
      >
        <!-- Heading -->
        <h2 class="text-xl sm:text-2xl">{{ title }}</h2>

        <!-- Close Button -->
        <LazyBaseButton
          size="xs"
          class="!rounded-full"
          @click="dialog?.close()"
        >
          <span class="sr-only">Close Popup</span>
          <Icon name="mdi:close" size="16" :color="themeColor" />
        </LazyBaseButton>
      </header>

      <!-- Slotted Content -->
      <slot />
    </section>
  </dialog>
</template>

<style scoped>
dialog {
  position: absolute;
  inset: 0;
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
  }
}

@keyframes scale-down {
  100% {
    scale: 0;
  }
}

@keyframes slide-in-up {
  0% {
    transform: translateY(20%);
  }
}
</style>
