<script setup lang="ts"></script>

<template>
  <div
    class="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] min-h-screen duration-[300ms]"
  >
    <!-- Header -->
    <Header />

    <!-- Aside -->
    <aside
      ref="drawer"
      class="relative flex col-span-1 col-start-1 row-start-1 row-span-3"
    >
      <SidebarNavigation class="w-fit" />

      <SidebarDrawer />
    </aside>

    <!-- Main -->
    <div>
      <slot />
    </div>

    <!-- Footer -->
    <footer
      class="p-2 text-center text-2xl border-t border-[var(--surface-lightened)]"
    >
      Footer
    </footer>
  </div>
</template>

<style></style>
