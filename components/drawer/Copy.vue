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
    class="absolute right-0 bg-[var(--surface-default)] lg:relative h-full"
  >
    <div class="py-4 px-4 border-[var(--surface-lightened)] border-l h-full">
      <transition-group
        tag="ul"
        name="list-fade"
        class="w-[min(400px,_30vw)] lg:w-[min(400px,_15vw)] xl:w-[min(400px,_20vw)]"
      >
        <li
          v-for="(property, index) in copiedProperties"
          :key="JSON.stringify(property)"
          class="copied-property"
          draggable="true"
        >
          <div class="flex gap-2 items-start">
            <span class="font-bold">{{ Object.keys(property)[0] }}: </span>
            <span>{{ Object.values(property)[0] }}</span>
          </div>

          <!-- Remove Icon Button -->
          <BaseButton
            size="xs"
            bg-color="var(--surface-lightened)"
            class="!rounded h-fit"
            @click="copiedDataStore.removeCopiedProperty(index)"
          >
            <Icon name="mdi:close" size="16" />
            <BaseTooltip bottom-left
              >Remove {{ Object.keys(property)[0] }}</BaseTooltip
            >
          </BaseButton>
        </li>
      </transition-group>
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

  <transition name="button-fade">
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
ul {
  position: relative;
}

.copied-property {
  margin-bottom: 0.75rem;
  padding-inline: 0.5rem;
  padding-block: 0.375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--surface-lightened);
  border-radius: 6px;
  width: 100%;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

/* Transitions */
.button-fade-enter-active {
  transition: 250ms ease 500ms;
}

.button-fade-leave-active {
  transition: 0ms ease;
}

.button-fade-enter-from,
.button-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .list-fade-move,
  .list-fade-enter-active,
  .list-fade-leave-active {
    transition: all 200ms ease;
  }

  .list-fade-enter-from,
  .list-fade-leave-to {
    opacity: 0;
    transform: translateX(2rem);
  }

  .list-fade-leave-active {
    position: absolute;
  }
}
</style>
