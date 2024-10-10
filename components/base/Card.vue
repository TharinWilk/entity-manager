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

const popover = ref<HTMLDialogElement>();

const togglePopover = () => {
  !popover.value?.open ? popover.value?.show() : popover.value?.close();
};
</script>

<template>
  <div
    v-if="data"
    ref="card"
    class="card bg-[var(--surface-lightened)] p-2 rounded-lg duration-500 relative"
    :class="{ dragging: isDragging }"
    @drag="handleDragEvent"
    @dragend="handleDragEnd"
  >
    <div
      class="flex justify-between items-center border-b border-[var(--text-secondary)] pb-2 relative"
    >
      <h2 class="text-3xl capitalize">{{ data.key }}</h2>

      <BaseButton
        bg-color="var(--surface-lightened)"
        class="button-icon cursor-pointer p-1 grid place-items-center border relative"
        @click="togglePopover"
      >
        <Icon name="mdi:dots-vertical" class="h-6 w-6" />
      </BaseButton>

      <!-- Popover Menu -->
      <LazyBasePopover ref="popover" class="top-0 left-[35%]">
        <div ref="dialogContent" class="grid gap-3">
          <BaseButton
            size="xs"
            class="text-base"
            @click="$emit('duplicate', data.key)"
            autofocus
            >Duplicate</BaseButton
          >
          <BaseButton
            size="xs"
            class="text-base"
            @click="$emit('delete', data.key)"
            >Delete</BaseButton
          >
        </div>
      </LazyBasePopover>
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

<style scoped>
.dragging {
  opacity: 0;
}
</style>
