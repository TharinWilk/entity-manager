<script setup lang="ts"></script>

<template>
  <footer class="footer p-2 text-center text-2xl">Footer</footer>
</template>

<style scoped>
.footer {
  --border-color: var(--surface-darkened);

  border-top: 1px solid var(--border-color);
}

[data-theme="light"] .footer {
  --border-color: var(--surface-darkened);
}

[data-theme="dark"] .footer {
  --border-color: var(--surface-dark-lightened);
}
</style>
