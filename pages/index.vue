<script setup lang="ts">
const managerStore = useManagerStore();
const { getActiveManager } = storeToRefs(managerStore);
const dataManagerStore = useDataManagerStore();
const { data, filter, filteredData } = storeToRefs(dataManagerStore);

const isTransitioning = ref(false);
const cardList = useTemplateRef("card-list");
const { mousePosition } = useDragArea(cardList);

function handleDrag() {
  const draggedElement = document.querySelector(".dragging") as HTMLElement;

  if (draggedElement.classList.contains("card")) {
    handleCardSorting(draggedElement);
  } else if (draggedElement.classList.contains(".property")) {
    console.log("property being dragged");
  }
}

function handleCardSorting(draggedElement: HTMLElement) {
  const siblings = Array.from(
    document.querySelectorAll(".card:not(.dragging)")
  ) as HTMLElement[];

  const { x, y } = mousePosition.value;

  for (const sibling of siblings) {
    const siblingRect = sibling.getBoundingClientRect();

    if (
      x >= siblingRect.left &&
      x <= siblingRect.right &&
      y >= siblingRect.top &&
      y <= siblingRect.bottom
    ) {
      if (isTransitioning.value) return;

      const elementKey = draggedElement.dataset.key;
      const siblingKey = sibling.dataset.key;

      if (!elementKey || !siblingKey) return;

      dataManagerStore.updateDataIndexing(elementKey, siblingKey);
      isTransitioning.value = true;

      setTimeout(() => {
        isTransitioning.value = false;
      }, 300);
    }
  }
}
</script>

<template>
  <main class="flex flex-col items-center p-4 sm:p-8 lg:p-12 gap-8">
    <h1 class="text-4xl">{{ getActiveManager?.name || "Hello" }}</h1>

    <!-- Cards -->
    <section
      ref="card-list"
      class="w-full"
      @dragover="handleDrag"
      @dragend="console.log('hello')"
    >
      <transition-group
        v-if="getActiveManager"
        name="card"
        tag="div"
        class="grid gap-8 grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] justify-center"
      >
        <BaseCard
          v-for="(value, key, index) of filteredData"
          :key="key"
          :data="{ value, key }"
          :data-key="key"
          :draggable="filter ? true : false"
        >
          <template #header> </template>

          <template #content> </template>
        </BaseCard>

        <ButtonAddCard
          key="add-button"
          @click="dataManagerStore.addNewDataField('')"
        />
      </transition-group>
    </section>
  </main>
</template>

<style>
.card-enter-active,
.card-leave-active {
  transition: 0s;
}

.card-enter-from,
.card-leave-to {
  position: absolute;
  opacity: 0;
  scale: 0;
}

.card-move {
  --transition-speed: 0ms;
  transition: transform var(--transition-speed) ease;
}

@media (prefers-reduced-motion: no-preference) {
  .card-move {
    --transition-speed: 300ms;
  }
}
</style>
