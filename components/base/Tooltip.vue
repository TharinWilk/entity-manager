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
  --point-top: conic-gradient(
      from 150deg at top,
      #0000,
      #000 1deg 60deg,
      #0000 61deg
    )
    top / 100% 50% no-repeat;
  --point-top-left: conic-gradient(
      from 150deg at 16px top,
      #0000,
      #000 1deg 60deg,
      #0000 61deg
    )
    top / 100% 50% no-repeat;
  --point-top-right: conic-gradient(
      from 150deg at calc(100% - 16px) top,
      #0000,
      #000 1deg 60deg,
      #0000 61deg
    )
    top / 100% 50% no-repeat;

  position: absolute;
  inline-size: max-content;
  z-index: 20;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;

  background-color: var(--surface-lightened);
  filter: drop-shadow(0 0px 8px var(--shadow-color));
  font-size: 0.875rem;

  opacity: 0;
  scale: 0;
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

  &[bottom],
  &[bottom-right],
  &[bottom-left] {
    top: calc(100% + 0.5rem);

    &::after {
      --tip-direction: var(--point-top);
      inset-block-start: calc(var(--point-size) * -1);
      border-block-start: var(--point-size) solid transparent;
    }
  }

  &[bottom-right] {
    left: 0;

    &::after {
      --tip-direction: var(--point-top-left);
    }
  }

  &[bottom-left] {
    right: 0;

    &::after {
      --tip-direction: var(--point-top-right);
    }
  }
}

:has(> tool-tip) {
  position: relative;

  &:is(:hover, :focus-visible, :active) {
    z-index: 20;
  }
}

:has(> tool-tip):is(:hover, :focus-visible, :active) > tool-tip {
  opacity: 1;
  scale: 1;
  transition-delay: 300ms;
}

[data-theme="light"] tool-tip {
  --shadow-color: var(--surface-shadow-bottom);
}

[data-theme="dark"] tool-tip {
  --shadow-color: var(--surface-shadow-top);
}
</style>
