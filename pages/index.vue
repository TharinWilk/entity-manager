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

const updateDataKey = (
  value: string,
  key: any,
  index: number,
  sectionFilter?: string | number
) => {
  if (!data.value) return;
  // Guard - Block user from adding the same named key
  if (value == key) {
    return;
  }

  // Create and insert new key name into the data at the current key's index
  const filterValue = sectionFilter || filter.value;
  const entries = Object.entries(data.value[filterValue]);
  entries.splice(index, 0, [value, data.value[filterValue][key]]);

  // Update the data object and delete the previous key
  data.value[filterValue] = Object.fromEntries(entries);
  delete data.value[filterValue][key];
};
</script>

<template>
  <main class="flex flex-col items-center p-4 sm:p-8 lg:p-12 gap-8">
    <h1 class="text-4xl">{{ getActiveManager?.name || "Hello" }}</h1>

    <!-- Cards -->
    <section ref="card-list" class="w-full" @dragover="handleDrag">
      <div v-if="getActiveManager">
        <div
          v-for="(value, key) of filteredData"
          class="flex flex-col gap-8 mb-8"
        >
          <h2>{{ key }}</h2>
          <transition-group
            :key="key"
            name="card"
            tag="div"
            class="grid gap-8 grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] justify-center"
          >
            <BaseCard
              v-for="(v, k, index) of value"
              :key="k"
              :data-key="k"
              :draggable="filter ? true : false"
            >
              <template #header>
                <InlineEditor
                  component="h3"
                  :content="k.toString()"
                  class="!text-3xl capitalize"
                  @update:text="(input: string) => updateDataKey(input, k, index, key)"
                />

                <ButtonEditCard
                  @duplicate:card="
                    dataManagerStore.duplicateDataField(k.toString())
                  "
                  @delete:card="dataManagerStore.deleteDataField(k.toString())"
                />
              </template>

              <template #content>
                <div
                  v-for="(propertyValue, propertyKey, index) of v"
                  :key="propertyKey"
                  class="py-2"
                >
                  <span
                    class="group hover:bg-[var(--surface-lightest)] flex gap-1.5 items-center py-1 px-2 leading-7 rounded-md"
                  >
                    <div class="flex flex-wrap gap-1.5">
                      <InlineEditor
                        component="strong"
                        :content="propertyKey.toString()"
                      />
                      <strong>: </strong>
                      <InlineEditor component="span" :content="propertyValue" />
                    </div>

                    <ListPropertyButtons
                      :property-name="propertyKey.toString()"
                      @click="(value) => console.log(value)"
                    />
                  </span>
                </div>
              </template>
            </BaseCard>

            <ButtonAddCard
              key="add-button"
              @click="dataManagerStore.addNewDataField('')"
            />
          </transition-group>
        </div>
      </div>
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
