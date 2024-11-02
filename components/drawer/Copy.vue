<script setup lang="ts">
import type { BaseDrawer } from "#build/components";

const copiedDataStore = useCopiedDataStore();
const { copiedProperties } = storeToRefs(copiedDataStore);

const copyDrawer = ref<InstanceType<typeof BaseDrawer> | null>(null);

watch(
  () => copiedProperties.value.length,
  (newLength) => {
    newLength > 0
      ? copyDrawer.value?.updateIsOpen(true)
      : copyDrawer.value?.updateIsOpen(false);
  }
);
</script>

<template>
  <BaseDrawer
    ref="copyDrawer"
    opening-direction="left"
    :class="{ 'pr-4': copiedProperties.length > 0 }"
  >
    <div class="py-2 px-4 border-black border-l h-full">
      <ul class="flex flex-col gap-3 w-[min(400px,_30vw)]">
        <li
          v-for="(property, index) in copiedProperties"
          :key="index"
          class="copied-property"
          draggable="true"
        >
          <div>
            <span>{{ Object.keys(property)[0] }}: </span>
            <span>{{ Object.values(property)[0] }}</span>
          </div>

          <!-- Remove Icon Button -->
          <BaseButton
            size="xs"
            bg-color="var(--surface-lightened)"
            class="!rounded"
            @click="copiedDataStore.removeCopiedProperty(index)"
          >
            <Icon name="mdi:close" size="16" />
            <BaseTooltip bottom-left
              >Remove {{ Object.keys(property)[0] }}</BaseTooltip
            >
          </BaseButton>
        </li>
      </ul>
    </div>

    <template #button>
      <BaseButton
        v-if="copiedProperties.length > 0 && copyDrawer?.isOpen"
        size="xs"
        class="absolute w-8 h-8 !rounded-full -translate-x-4 top-10"
        @click="copyDrawer?.updateIsOpen(false)"
      >
        <Icon name="mdi:chevron-right" size="24" />

        <!-- Tooltip -->
        <BaseTooltip left> Close Copy Drawer </BaseTooltip>
      </BaseButton>
    </template>
  </BaseDrawer>

  <transition name="test">
    <BaseButton
      v-if="!copyDrawer?.isOpen && copiedProperties.length > 0"
      size="sm"
      class="absolute text-base top-4 right-4"
      @click="copyDrawer?.updateIsOpen(true)"
    >
      Open Copy Drawer
    </BaseButton>
  </transition>
</template>

<style scoped>
.copied-property {
  display: flex;
  justify-content: space-between;
  padding-inline: 0.5rem;
  padding-block: 0.375rem;
  background-color: var(--surface-lightened);
  border-radius: 6px;
  width: 100%;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

.test-enter-active {
  transition: 250ms ease 500ms;
}

.test-leave-active {
  transition: 0ms ease;
}

.test-enter-from,
.test-leave-to {
  opacity: 0;
}
</style>
