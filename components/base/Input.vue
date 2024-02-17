<script setup lang="ts"></script>

<template>
  <input type="text" class="base-input" />
</template>

<style scoped>
.base-input {
  --size: 1rem;
  --shadow-color: var(--surface-shadow-top);

  padding: calc(var(--size) / 4) var(--size);
  border-radius: 0.5rem;
  outline: 3px solid transparent;

  font-size: 1rem;
  background-color: var(--surface-default);

  transition: outline-color 200ms ease;

  &:focus,
  &:hover {
    outline-color: var(--surface-shadow-bottom);
  }
}

[data-theme="light"] .base-input {
  --shadow-color: var(--surface-shadow-bottom);
  box-shadow: inset 0px 1px 5px var(--shadow-color);
}

[data-theme="dark"] .base-input {
  --shadow-color: var(--surface-shadow-top);
  box-shadow: inset 0px 5px 12px var(--shadow-color);
}
</style>
