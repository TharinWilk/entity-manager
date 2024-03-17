<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    default: undefined,
  },
});

const card = ref<HTMLElement>();

const isDragging = ref(false);
const handleDragEvent = (event: Event) => {
  event.preventDefault();
  isDragging.value = true;
};

const handleDragEnd = (event: Event) => {
  event.preventDefault();

  isDragging.value = false;
};
</script>

<template>
  <div
    v-if="data"
    ref="card"
    class="card bg-[var(--surface-lightened)] p-2 rounded-lg duration-500"
    :class="{ dragging: isDragging }"
    @drag="handleDragEvent"
    @dragend="handleDragEnd"
  >
    <div
      class="flex justify-between items-center border-b border-[var(--text-secondary)] pb-2"
    >
      <h2 class="text-3xl capitalize">{{ data.key }}</h2>

      <span
        class="cursor-grab active:cursor-grabbing p-1 grid place-items-center"
      >
        <Icon name="mdi:drag-vertical" class="h-6 w-6" />
      </span>
    </div>

    <div class="py-2">
      <div
        v-for="(propertyValue, propertyKey) of data.value"
        :key="propertyKey"
      >
        <span
          ><strong>{{ propertyKey }}:</strong> {{ propertyValue }}</span
        >
      </div>
    </div>
  </div>
</template>

<style>
.dragging {
  opacity: 0;
}
</style>
