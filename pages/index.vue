<script setup lang="ts">
const managerStore = useManagerStore();
const { getActiveManager } = storeToRefs(managerStore);
const managerDataStore = useDataManagerStore();

const dataList = ref<HTMLElement>();
const isTransitioning = ref(false);

const handleDragSorting = (event: MouseEvent) => {
  if (!dataList.value || !managerDataStore.filter) {
    return;
  }

  const draggedElement = dataList.value.querySelector(
    ".card.dragging"
  ) as HTMLElement;

  const siblings = Array.from(
    dataList.value.querySelectorAll(".card:not(.dragging)")
  ) as HTMLElement[];

  const mouseY = event.clientY;
  const mouseX = event.clientX;

  for (const sibling of siblings) {
    const siblingRect = sibling.getBoundingClientRect();

    if (
      mouseY >= siblingRect.top &&
      mouseY <= siblingRect.bottom &&
      mouseX >= siblingRect.left &&
      mouseX <= siblingRect.right
    ) {
      if (isTransitioning.value) return;

      const elementKey = draggedElement.dataset.key;
      const siblingKey = sibling.dataset.key;
      if (!elementKey || !siblingKey) return;

      updateDataIndexing(elementKey, siblingKey);
      isTransitioning.value = true;

      setTimeout(() => {
        isTransitioning.value = false;
      }, 300);
    }
  }
};

const { data, updateDataIndexing, updateStoredData } =
  useData(managerDataStore);

function useData(inputData: any) {
  const data = ref(inputData.filteredData);

  watch(
    () => inputData.filteredData,
    () => {
      data.value = inputData.filteredData;
    }
  );

  const updateDataIndexing = (key: string, newIndexKey: string) => {
    if (!data.value || !(key in data.value) || !(newIndexKey in data.value))
      return;

    const keys = Object.keys(data.value);
    const index = keys.indexOf(key);
    const newIndex = keys.indexOf(newIndexKey);

    if (newIndex < 0 || newIndex >= keys.length) return;

    const newKeys = [...keys];
    newKeys.splice(index, 1);
    newKeys.splice(newIndex, 0, key);

    const reorderedData: { [key: string]: any } = {};

    newKeys.forEach((item) => {
      reorderedData[item] = data.value[item];
    });

    data.value = reorderedData;
  };

  const updateStoredData = () => {
    setTimeout(() => {
      managerDataStore.updateData(data.value);
    }, 300);
  };

  return { data, updateDataIndexing, updateStoredData };
}
</script>

<template>
  <main class="grid place-items-center p-4 sm:p-8 lg:p-12 gap-8">
    <h1 class="text-4xl">{{ getActiveManager?.name || "Hello" }}</h1>

    <!-- Cards -->
    <section
      v-if="getActiveManager"
      ref="dataList"
      class="w-full"
      @dragover="handleDragSorting"
      @dragend="updateStoredData"
    >
      <transition-group
        name="card"
        tag="div"
        class="grid gap-8 grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] justify-center"
      >
        <BaseCard
          v-for="(value, key) of data"
          :key="key"
          :data="{ value, key }"
          :data-key="key"
          :draggable="managerDataStore.filter ? true : false"
          @delete="managerDataStore.deleteDataField"
        />

        <ButtonAddCard
          key="add-button"
          @click="managerDataStore.addNewDataField('')"
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
