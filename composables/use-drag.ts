type MaybeElementRef =
  | HTMLElement
  | Ref<HTMLElement | undefined>
  | null
  | undefined;

export const useDrag = (element: MaybeElementRef) => {
  const draggedElement = ref<MaybeElementRef>(null);
  const isDragging = ref(false);

  const startDrag = () => {
    isDragging.value = true;
    draggedElement.value?.classList.add("dragging");
  };

  const endDrag = () => {
    isDragging.value = false;
    draggedElement.value?.classList.remove("dragging");
  };

  onMounted(() => {
    draggedElement.value = unref(element);
  });

  onUnmounted(() => {
    draggedElement.value = null;
  });

  return {
    isDragging,
    draggedElement,
    startDrag,
    endDrag,
  };
};
