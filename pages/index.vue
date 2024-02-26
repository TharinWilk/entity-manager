<script setup lang="ts">
const managerData = useDataManagerStore();
const { data } = storeToRefs(managerData);
</script>

<template>
  <main class="grid place-items-center p-4 sm:p-8 lg:p-12">
    <h1 class="text-4xl">Main Content</h1>
    <p>{{ data }}</p>
  </main>
</template>

<style></style>
