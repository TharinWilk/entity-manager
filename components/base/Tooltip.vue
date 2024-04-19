<script setup lang="ts"></script>

<template>
  <tool-tip role="tooltip">
    <slot />
  </tool-tip>
</template>

<style>
tool-tip {
  --point-size: 6px;
  --point-left: conic-gradient(
      from 60deg at left,
      #0000,
      #000 1deg 60deg,
      #0000 61deg
    )
    left / 50% 100% no-repeat;
  --point-right: conic-gradient(
      from -120deg at right,
      #0000,
      #000 1deg 60deg,
      #0000 61deg
    )
    right / 50% 100% no-repeat;

  position: absolute;
  inline-size: max-content;
  z-index: 20;
  padding: 0.25rem 0.5rem;

  border-radius: 0.375rem;

  background-color: var(--surface-lightened);

  font-size: 0.875rem;

  opacity: 0;
  scale: 1;
  transition: scale 200ms ease, opacity 200ms ease, transform 200s ease;

  pointer-events: none;
  user-select: none;

  &::before {
    position: absolute;
    content: "; Has tooltip: ";
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
  }

  /* tooltip shape is a pseudo element so we can cast a shadow */
  &::after {
    content: "";
    background: var(--surface-lightened);
    position: absolute;
    z-index: -1;
    inset: 0;
    mask: var(--tip-direction);
  }

  &[right] {
    left: calc(100% + 0.5rem);

    &::after {
      --tip-direction: var(--point-left);
      inset-inline-start: calc(var(--point-size) * -1);
      border-inline-end: var(--point-size) solid transparent;
    }
  }

  &[left] {
    right: calc(100% + 0.5rem);

    &::after {
      --tip-direction: var(--point-right);
      inset-inline-end: calc(var(--point-size) * -1);
      border-inline-start: var(--point-size) solid transparent;
    }
  }
}

:has(> tool-tip) {
  position: relative;
  z-index: 20;
}

:has(> tool-tip):is(:hover, :focus-visible, :active) > tool-tip {
  opacity: 1;
  scale: 1;
  transition-delay: 300ms;
}
</style>
