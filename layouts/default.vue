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
      class="relative z-10 flex col-span-1 col-start-1 row-start-1 row-span-3"
    >
      <SidebarNavigation />

      <SidebarDrawer />

      <div id="aside"></div>
    </aside>

    <!-- Main -->
    <div id="content" class="relative">
      <slot />
    </div>

    <!-- Footer -->
    <Footer class="hidden" />
  </div>
</template>

<style></style>
