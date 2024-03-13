<script setup lang="ts">
const managerData = useDataManagerStore();

const dataList = ref<HTMLElement>();
const isTransitioning = ref(false);

const handleDragSorting = (event: MouseEvent) => {
  if (!dataList.value) {
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

const { data, updateDataIndexing } = useData(managerData);

function useData(inputData: any) {
  const data = ref(inputData.filteredData);

  watch(inputData, () => {
    data.value = inputData.filteredData;
  });

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

    const reorderedData = {};

    newKeys.forEach((item) => {
      reorderedData[item] = data.value[item];
    });

    data.value = reorderedData;
  };

  return { data, updateDataIndexing };
}
</script>

<template>
  <main class="grid place-items-center p-4 sm:p-8 lg:p-12 gap-8">
    <h1 class="text-4xl">Main Content</h1>

    <!-- Cards -->
    <section ref="dataList" @dragover="handleDragSorting">
      <transition-group name="card" tag="div" class="grid grid-cols-2 gap-8">
        <BaseCard
          v-for="(value, key) of data"
          :key="key"
          :data="{ value, key }"
          :data-key="key"
        />
      </transition-group>
    </section>
  </main>
</template>

<style>
.card-move {
  transition: 0.3s ease;
}
</style>
