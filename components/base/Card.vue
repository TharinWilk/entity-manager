<script setup lang="ts">
const card = ref<HTMLElement>();

// Handle Dragging
const { isDragging, startDrag, endDrag } = useDrag(card);
</script>

<template>
  <div
    ref="card"
    class="card bg-[var(--surface-lightened)] p-2 rounded-lg duration-500 relative"
    :class="{ dragging: isDragging }"
    @dragstart="startDrag"
    @dragend="endDrag"
  >
    <!-- Header / Title -->
    <div
      class="flex justify-between items-center border-b border-[var(--text-secondary)] pb-2 relative"
    >
      <slot name="header" />
    </div>

    <!-- Content -->
    <div class="py-2">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>
.dragging {
  opacity: 0;
}
</style>
