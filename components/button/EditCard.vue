<script setup lang="ts">
defineEmits(["duplicate:card", "delete:card"]);

const popover = useTemplateRef("popover");
const isPopoverOpen = ref(false);

function togglePopover() {
  isPopoverOpen.value = !isPopoverOpen.value;

  if (!popover.value) return;

  if (isPopoverOpen.value) {
    popover.value.show();
  } else {
    popover.value.close();
  }
}
</script>

<template>
  <BaseButton
    bg-color="var(--surface-lightened)"
    class="button-icon cursor-pointer p-1 grid place-items-center border relative"
    aria-haspopup="menu"
    :aria-expanded="isPopoverOpen"
    @click="togglePopover"
  >
    <Icon name="mdi:dots-vertical" class="h-6 w-6" />
  </BaseButton>

  <!-- Popover Menu -->
  <LazyBasePopover ref="popover" class="top-0 !ml-auto !mr-14 z-10">
    <div ref="dialogContent" class="grid gap-3">
      <BaseButton
        size="xs"
        class="text-base"
        autofocus
        @click="$emit('duplicate:card')"
        >Duplicate</BaseButton
      >
      <BaseButton size="xs" class="text-base" @click="$emit('delete:card')"
        >Delete</BaseButton
      >
    </div>
  </LazyBasePopover>
</template>

<style></style>
