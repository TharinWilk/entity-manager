<script setup lang="ts"></script>

<template>
  <div
    id="layout"
    class="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] min-h-screen duration-[300ms]"
  >
    <!-- Header -->
    <Header />

    <!-- Aside -->
    <aside
      class="sticky top-0 h-screen z-50 flex col-span-1 col-start-1 row-start-1 row-span-3 isolate"
    >
      <SidebarNavigation />

      <SidebarDrawer />
    </aside>

    <!-- Main -->
    <div
      id="content"
      class="relative col-start-2 col-span-1 row-span-1 row-start-2"
    >
      <slot />
    </div>

    <!-- Footer -->
    <Footer class="hidden" />

    <BaseToaster />
  </div>
</template>

<style></style>
