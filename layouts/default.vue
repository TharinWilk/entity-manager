<script setup lang="ts"></script>

<template>
  <div
    class="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] min-h-screen duration-[300ms]"
  >
    <!-- Header -->
    <Header />

    <!-- Aside -->
    <aside
      class="relative isolate flex col-span-1 col-start-1 row-start-1 row-span-3"
    >
      <SidebarNavigation class="w-fit" />

      <SidebarDrawer />
    </aside>

    <!-- Main -->
    <div>
      <slot />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style></style>
