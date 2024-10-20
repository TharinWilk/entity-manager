<script setup lang="ts">
const toaster = ref<HTMLElement>();
const { toasts } = useToast();

watch(
  toasts,
  (newValue) => {
    if (newValue.length > 0) {
      toaster.value?.showPopover();
    } else {
      toaster.value?.hidePopover();
    }
  },
  { deep: true }
);
</script>

<template>
  <section ref="toaster" class="toaster" aria-live="assertive" popover>
    <transition-group name="toast-animation">
      <BaseToast
        v-for="toast in toasts"
        :key="toast.id"
        :toast-type="toast.type"
        >{{ toast.message }}
      </BaseToast>
    </transition-group>
  </section>
</template>

<style>
.toaster {
  position: fixed;
  width: 100dvw;
  height: 100dvh;
  padding-block-end: 2vh;
  padding-inline-end: 2vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 1vh;
  overflow: hidden;
  pointer-events: none;
  outline: none;
  z-index: 10;
  background-color: transparent;
}

.toast-animation-move,
.toast-animation-enter-active,
.toast-animation-leave-active {
  transition: 200ms ease all;
}

.toast-animation-enter-from {
  filter: blur(4px);
  transform: translateY(4vh);
}

.toast-animation-leave-to {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(-2vh);
}
</style>
