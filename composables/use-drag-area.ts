export const useDragArea = (element: MaybeRef) => {
  const dropZone = ref<MaybeRef>(null);
  const mousePosition = ref({ x: 0, y: 0 });

  onMounted(() => {
    dropZone.value = unref(element);
    if (dropZone.value) {
      dropZone.value.addEventListener("dragover", handleDragOver);
      dropZone.value.addEventListener("drop", handleDrop);
    }
  });

  onUnmounted(() => {
    if (dropZone.value) {
      dropZone.value.removeEventListener("dragover", handleDragOver);
      dropZone.value.removeEventListener("drop", handleDrop);
    }
    dropZone.value = null;
  });

  const handleDragOver = (event: MouseEvent) => {
    mousePosition.value = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleDrop = () => {
    dropZone.value = null;
    mousePosition.value = {
      x: 0,
      y: 0,
    };
  };

  return { mousePosition, handleDragOver, handleDrop };
};
