<script setup lang="ts">
defineProps({
  openingDirection: {
    type: String as PropType<"up" | "down" | "left" | "right">,
    default: "right",
  },
});

const isOpen = ref(false);

function updateIsOpen(boolean: boolean) {
  isOpen.value = boolean;
}

defineExpose({ updateIsOpen, isOpen });
</script>

<template>
  <collapsable-drawer
    class="drawer"
    :direction="openingDirection"
    :open="isOpen"
  >
    <div>
      <slot />
    </div>

    <slot name="button" />
  </collapsable-drawer>
</template>

<style scoped>
.drawer {
  --transition-speed: 0ms;
  display: grid;

  &[direction="left"],
  &[direction="right"] {
    grid-template-columns: 0fr;
    transition: grid-template-columns var(--transition-speed) ease;

    &[open="true"] {
      grid-template-columns: 1fr;
    }
  }

  &[direction="up"],
  &[direction="down"] {
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--transition-speed) ease;

    &[open="true"] {
      grid-template-rows: 1fr;
    }
  }

  & > div {
    overflow: hidden;
  }

  @media (prefers-reduced-motion: no-preference) {
    --transition-speed: 500ms;
  }
}
</style>
