<script setup lang="ts">
const managerData = useDataManagerStore();
</script>

<template>
  <main class="grid place-items-center p-4 sm:p-8 lg:p-12 gap-8">
    <h1 class="text-4xl">Main Content</h1>

    <!-- Cards -->
    <section class="grid grid-cols-2 gap-8">
      <div
        v-for="(value, key) of managerData.filteredData"
        :key="key"
        class="bg-neutral-600 p-2 rounded-lg"
      >
        <h2 class="text-3xl underline capitalize">{{ key }}</h2>
        <div v-for="(propertyValue, propertyKey) of value" :key="propertyKey">
          <span
            ><strong>{{ propertyKey }}:</strong> {{ propertyValue }}</span
          >
        </div>
      </div>
    </section>
  </main>
</template>

<style></style>
