<script setup lang="ts">
import type { Toast } from "~/types/toast";

const props = defineProps({
  toastType: {
    type: String as PropType<Toast["type"]>,
    default: "default",
  },
});

const iconType = computed(() => {
  switch (props.toastType) {
    case "success":
      return "mdi:check-circle";
    case "warning":
      return "mdi:alert-circle";
    case "error":
      return "mdi:alert-circle";
    default:
      return "mdi:bell-circle";
  }
});
</script>

<template>
  <output ref="toast" role="status" :toastType>
    <Icon :name="iconType" size="16" />
    <slot />
  </output>
</template>

<style scoped>
output {
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  border-radius: 6px;
  border: 2px solid transparent;
  font-size: 1rem;

  background-color: color-mix(in oklab, var(--surface-default) 80%, cyan 20%);
  border-color: color-mix(in oklab, var(--surface-default) 65%, cyan 35%);

  &[toastType="success"] {
    background-color: color-mix(
      in oklab,
      var(--surface-default) 80%,
      green 20%
    );
    border-color: color-mix(in oklab, var(--surface-default) 65%, green 35%);
  }

  &[toastType="warning"] {
    background-color: color-mix(
      in oklab,
      var(--surface-default) 80%,
      yellow 20%
    );
    border-color: color-mix(in oklab, var(--surface-default) 65%, yellow 35%);
  }

  &[toastType="error"] {
    background-color: color-mix(in oklab, var(--surface-default) 80%, red 20%);
    border-color: color-mix(in oklab, var(--surface-default) 65%, red 35%);
  }
}
</style>
