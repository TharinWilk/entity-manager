<script setup lang="ts">
const toaster = ref<HTMLDialogElement>();
const { toasts } = useToast();

onMounted(() => {
  toaster.value?.show();
});
</script>

<template>
  <dialog ref="toaster" class="toaster" aria-live="assertive">
    <transition-group name="toast-animation">
      <BaseToast
        v-for="toast in toasts"
        :key="toast.id"
        :toast-type="toast.type"
        >{{ toast.message }}
      </BaseToast>
    </transition-group>
  </dialog>
</template>

<style>
.toaster[open] {
  position: fixed;
  padding-block-end: 2vh;
  display: grid;
  margin-left: auto;
  margin-right: 2vw;
  gap: 1vh;
  bottom: 0;
  pointer-events: none;
  background-color: transparent;
  outline: none;
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
