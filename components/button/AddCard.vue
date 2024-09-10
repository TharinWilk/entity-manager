<script setup lang="ts"></script>

<template>
  <button class="add-card-button">
    <span class="sr-only">Add a new card</span>
    <div class="py-2">
      <Icon name="mdi:plus-circle" class="h-12 w-12" />
    </div>
  </button>
</template>

<style>
.add-card-button {
  position: relative;
  width: 100%;
  padding: 0.5rem;
  background-color: var(--surface-lightened);
  border-radius: 0.5rem;
  transition: background-color 200ms linear, scale 200ms linear,
    outline-offset 200ms linear;

  &:hover {
    background-color: var(--surface-lightest);
  }

  &:focus-visible {
    outline-offset: 2px;
    outline: 3px solid var(--surface-shadow-bottom);
  }

  &:focus-visible:active {
    outline-offset: 0px;
    scale: 1;
  }

  &:active {
    transition: scale 75ms linear;
    scale: 0.96;
  }
}
</style>
