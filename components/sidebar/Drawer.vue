<script setup lang="ts">
// Handle Drawer Logic
const drawer = ref<HTMLElement>();
const isOpen = ref(true);

onClickOutside(
  () => drawer.value?.parentElement,
  () => {
    const windowRef = toRef(window);
    const isSmallScreen = windowRef.value.innerWidth < 768;
    const isDialogOpen = document.querySelector("dialog[open]");

    if (isOpen.value && isSmallScreen && !isDialogOpen) {
      isOpen.value = false;
    }
  }
);

// Handle Search Logic
const dataManagerStore = useDataManagerStore();
const { filter } = storeToRefs(dataManagerStore);
const search = ref("");

const filteredSearchResults = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return dataManagerStore.getSections.filter((section) => {
    return section.toLowerCase().includes(searchTerm);
  });
});

// Handle Modal
const modal = ref<HTMLDialogElement>();
const openModal = () => {
  modal.value?.show();
};

// Handle Icon Color
const { themeColor } = useTheme();

// Handle Button Positioning
const isFixedButtonVisible = ref(false);

watch(isOpen, () => {
  if (!isOpen.value) {
    // Wait for animation to complete
    setTimeout(() => {
      isFixedButtonVisible.value = true;
    }, 500);
  } else isFixedButtonVisible.value = false;
});
</script>

<template>
  <!-- Drawer -->
  <section
    ref="drawer"
    :class="
      isOpen
        ? 'md:grid-cols-[1fr] translate-x-0'
        : 'md:grid-cols-[0fr] -translate-x-full md:translate-x-0'
    "
    class="sidebar-drawer motion-safe:duration-500 flex -z-10 md:grid md:z-10 absolute md:relative left-full md:left-auto bg-[var(--surface-default)]"
  >
    <div class="overflow-hidden">
      <div class="grid p-4 gap-4">
        <!-- Search Input -->
        <div>
          <BaseInput
            id="drawer-search"
            v-model="search"
            placeholder="Search"
            :disabled="!isOpen"
          />
          <label for="drawer-search" class="sr-only">Search</label>
        </div>

        <!-- Button List -->
        <ClientOnly>
          <transition-group
            tag="ul"
            class="relative grid gap-4 w-full"
            name="fade"
            appear
          >
            <!-- Data Section Buttons -->
            <li
              v-for="item in filteredSearchResults"
              :key="item"
              class="w-full"
            >
              <BaseButton
                size="xs"
                :disabled="!isOpen"
                :aria-selected="filter === item"
                class="text-base w-full"
                :style="
                  filter === item
                    ? 'color: var(--text-accent); --box-shadow-color: var(--text-accent)'
                    : ''
                "
                @click="dataManagerStore.setFilter(item)"
              >
                {{ item }}
              </BaseButton>
            </li>

            <!-- Activate Add Data Section Button -->
            <li key="addNewEntity" class="w-full">
              <BaseButton
                size="xs"
                class="text-base w-full"
                :disabled="!isOpen"
                @click="openModal"
              >
                <span class="sr-only">Add</span>
                <Icon name="mdi:plus" size="24" :color="themeColor" />
              </BaseButton>
            </li>
          </transition-group>
        </ClientOnly>
      </div>
    </div>

    <!-- Open / Close Drawer Button - Follows Drawer -->
    <BaseButton
      v-if="!isFixedButtonVisible"
      size="xs"
      class="absolute w-8 h-8 !rounded-full left-full -translate-x-4 top-1/2 -translate-y-1/2"
      @click.stop="isOpen = !isOpen"
    >
      <span class="sr-only"
        >{{ isOpen ? "Close" : "Open" }} Sidebar Drawer</span
      >
      <Icon
        name="mdi:chevron-right"
        :color="themeColor"
        size="24"
        :class="{ 'rotate-180': isOpen }"
      />

      <!-- Tooltip -->
      <BaseTooltip right>
        {{ isOpen ? "Close" : "Open" }} Sidebar Drawer
      </BaseTooltip>
    </BaseButton>
  </section>

  <!-- Open / Close Drawer Button - Fixed to nav  -->
  <BaseButton
    v-if="isFixedButtonVisible"
    size="xs"
    class="absolute w-8 h-8 !rounded-full left-full -translate-x-4 top-1/2 -translate-y-1/2 z-10"
    @click.stop="isOpen = !isOpen"
  >
    <span class="sr-only">{{ isOpen ? "Close" : "Open" }} Sidebar Drawer</span>
    <Icon
      name="mdi:chevron-right"
      :color="themeColor"
      size="24"
      :class="{ 'rotate-180': isOpen }"
    />

    <BaseTooltip right>
      {{ isOpen ? "Close" : "Open" }} Sidebar Drawer
    </BaseTooltip>
  </BaseButton>

  <!-- Create Manager Modal -->
  <ClientOnly>
    <Teleport to="#layout">
      <LazyBaseDialog ref="modal" title="Create Data Section">
        <FormAddSection :dialog="modal" />
      </LazyBaseDialog>
    </Teleport>
  </ClientOnly>
  <!-- Create Manager Modal End -->
</template>

<style scoped>
.sidebar-drawer {
  --border-color: var(--surface-darkened);

  height: 100%;
  gap: 1rem;

  border-right: 1px solid var(--border-color);

  transition: grid-template-columns 500ms, transform 500ms;
}

[data-theme="light"] .sidebar-drawer {
  --border-color: var(--surface-darkened);
}

[data-theme="dark"] .sidebar-drawer {
  --border-color: var(--surface-dark-lightened);
}

/* Transitions */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: 500ms ease all;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.fade-leave-active {
  position: absolute;
}
</style>
