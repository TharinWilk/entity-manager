<script setup lang="ts">
type Size = "xs" | "sm" | "md" | "lg" | "xl";

const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: "md",
  },
});

const size = computed(() => {
  switch (props.size) {
    case "xs":
      return "1rem";
      break;
    case "sm":
      return "1.5rem";
      break;
    case "md":
      return "2rem";
      break;
    case "lg":
      return "4rem";
      break;
    case "xl":
      return "8rem";
      break;
  }
});
</script>

<template>
  <button type="button" class="base-button" :style="{ '--size': size }">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  --size: 1rem;

  display: grid;
  place-items: center;
  padding: calc(var(--size) / 4);

  box-shadow: 0px 0px 2px 0px var(--surface-shadow-bottom);
  border-radius: 0.5rem;

  background-color: var(--surface-default);

  transition: scale 200ms linear, box-shadow 200ms linear,
    outline-offset 200ms linear;

  &:focus-visible {
    outline-offset: 2px;
    outline: 3px solid var(--surface-shadow-bottom);
  }

  &:focus-visible:active {
    outline-offset: 0px;
    scale: 1;
  }

  &:hover {
    scale: 1;
    box-shadow: 0px 2px 4px 0px var(--surface-shadow-bottom),
      0px -2px 4px 0px var(--surface-shadow-top);
  }

  &:active {
    transition: 75ms;
    scale: 0.96;
    box-shadow: 0px 0px 2px 0px var(--surface-shadow-bottom);
  }
}
</style>
