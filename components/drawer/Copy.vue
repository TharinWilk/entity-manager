<script setup lang="ts">
import type { BaseDrawer } from "#build/components";

const copiedDataStore = useCopiedDataStore();
const { copiedProperties } = storeToRefs(copiedDataStore);

const drawer = ref<InstanceType<typeof BaseDrawer> | null>(null);

watch(
  () => copiedProperties.value.length,
  (newLength) => {
    newLength > 0
      ? drawer.value?.updateIsOpen(true)
      : drawer.value?.updateIsOpen(false);
  }
);
</script>

<template>
  <BaseDrawer ref="drawer" opening-direction="left" class="drawer">
    <!-- <div class=""> -->
    <transition-group tag="ul" name="list-fade">
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
          <Icon name="mdi:close" size="16" class="min-w-4" />
          <BaseTooltip bottom-left
            >Remove {{ Object.keys(property)[0] }}</BaseTooltip
          >
        </BaseButton>
      </li>
    </transition-group>
    <!-- </div> -->

    <template #button>
      <BaseButton
        v-if="copiedProperties.length > 0 && drawer?.isOpen"
        size="xs"
        class="absolute w-8 h-8 !rounded-full -translate-x-4 top-10"
        @click="drawer?.updateIsOpen(false)"
      >
        <Icon name="mdi:chevron-right" size="24" />

        <!-- Tooltip -->
        <BaseTooltip left> Close Copy Drawer </BaseTooltip>
      </BaseButton>
    </template>
  </BaseDrawer>

  <transition name="button-fade">
    <BaseButton
      v-if="!drawer?.isOpen && copiedProperties.length > 0"
      size="sm"
      class="absolute text-base top-4 right-4"
      @click="drawer?.updateIsOpen(true)"
    >
      Open Copy Drawer
    </BaseButton>
  </transition>
</template>

<style scoped>
collapsable-drawer.drawer {
  position: absolute;
  right: 0;
  background-color: var(--surface-default);
  height: 100%;
}

@media screen and (min-width: 1280px) {
  collapsable-drawer.drawer {
    position: relative;
  }
}

@media screen and (width < 1280px) {
  collapsable-drawer.drawer {
    transition: grid-template-columns var(--transition-speed) ease,
      opacity 200ms ease;

    &:has(.copied-property:active) {
      opacity: 0.25;
      pointer-events: none;
    }
  }
}

ul {
  position: relative;
  width: min(27rem, 65vw);
  height: 100%;
  padding: 1rem;
  border-left: 1px solid var(--surface-lightened);
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
    pointer-events: all;
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
