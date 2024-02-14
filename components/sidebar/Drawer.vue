<script setup lang="ts">
const isOpen = ref(true);
</script>

<template>
  <section
    :class="isOpen ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'"
    class="relative h-full grid duration-500 border-r border-[var(--surface-lightened)] text-2xl"
  >
    <div class="overflow-hidden">
      <p class="p-10">Drawer</p>
    </div>
  </section>

  <BaseButton
    size="xs"
    class="absolute w-8 h-8 !rounded-full left-full -translate-x-4 top-1/2 -translate-y-1/2"
    @click="isOpen = !isOpen"
  >
    <Icon
      name="mdi:chevron-right"
      color="white"
      size="24"
      :class="{ 'rotate-180': isOpen }"
    />
  </BaseButton>
</template>

<style></style>
