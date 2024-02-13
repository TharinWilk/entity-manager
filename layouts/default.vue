<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] min-h-screen">
    <!-- Header -->
    <header
      class="text-2xl text-center border-b border-[var(--surface-lightened)]"
    >
      Header
    </header>

    <!-- Aside -->
    <aside class="col-start-1 row-start-1 col-span-1 row-span-3 flex">
      <SidebarNavigation />
      <SidebarDrawer
        class="grid place-items-center min-w-40 border-r border-[var(--surface-lightened)] text-2xl"
      />
    </aside>

    <!-- Main -->
    <slot />

    <!-- Footer -->
    <footer
      class="p-2 text-center text-2xl border-t border-[var(--surface-lightened)]"
    >
      Footer
    </footer>
  </div>
</template>

<style></style>
