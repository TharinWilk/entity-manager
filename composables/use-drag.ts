export const useDrag = (element: MaybeRef) => {
  const draggedElement = ref<MaybeRef>(null);
  const isDragging = ref(false);

  onMounted(() => {
    draggedElement.value = unref(element);
  });

  onUnmounted(() => {
    draggedElement.value = null;
  });

  const startDrag = () => {
    isDragging.value = true;
    draggedElement.value?.classList.add("dragging");
  };

  const endDrag = () => {
    isDragging.value = false;
    draggedElement.value?.classList.remove("dragging");
  };

  return {
    isDragging,
    draggedElement,
    startDrag,
    endDrag,
  };
};
