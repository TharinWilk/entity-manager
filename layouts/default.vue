<script setup lang="ts">
const isOpen = ref(true);
</script>

<template>
  <div
    class="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] min-h-screen duration-[300ms]"
  >
    <!-- Header -->
    <header
      class="text-2xl text-center border-b border-[var(--surface-lightened)] duration-[300ms]"
    >
      Header
    </header>

    <!-- Aside -->
    <aside
      class="grid grid-cols-[auto_auto] col-span-1 col-start-1 row-start-1 row-span-3"
    >
      <SidebarNavigation class="w-fit" />

      <SidebarDrawer
        :class="isOpen ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'"
        class="grid duration-500 border-r border-[var(--surface-lightened)] text-2xl"
      />
    </aside>

    <!-- Main -->
    <div>
      <slot />
      <button @click="isOpen = !isOpen">Click</button>
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
