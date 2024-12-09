export const useDragArea = (element: MaybeRef) => {
  const dropZone = ref<MaybeRef>(null);
  const mousePosition = ref({ x: 0, y: 0 });

  onMounted(() => {
    dropZone.value = unref(element);
    if (dropZone.value) {
      console.log(dropZone.value);
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

  const handleDrop = (event: MouseEvent) => {
    dropZone.value = null;
    mousePosition.value = {
      x: 0,
      y: 0,
    };
  };

  watch(dropZone, (newValue) => {
    console.log(newValue);
  });

  return { mousePosition, handleDragOver, handleDrop };
};

// const handleDragSorting = (event: MouseEvent) => {
//   if (!dataList.value || !managerDataStore.filter) {
//     return;
//   }

//   const draggedElement = dataList.value.querySelector(
//     ".card.dragging"
//   ) as HTMLElement;

//   const siblings = Array.from(
//     dataList.value.querySelectorAll(".card:not(.dragging)")
//   ) as HTMLElement[];

//   const mouseY = event.clientY;
//   const mouseX = event.clientX;

//   for (const sibling of siblings) {
//     const siblingRect = sibling.getBoundingClientRect();

//     if (
//       mouseY >= siblingRect.top &&
//       mouseY <= siblingRect.bottom &&
//       mouseX >= siblingRect.left &&
//       mouseX <= siblingRect.right
//     ) {
//       if (isTransitioning.value) return;

//       const elementKey = draggedElement.dataset.key;
//       const siblingKey = sibling.dataset.key;
//       if (!elementKey || !siblingKey) return;

//       updateDataIndexing(elementKey, siblingKey);
//       isTransitioning.value = true;

//       setTimeout(() => {
//         isTransitioning.value = false;
//       }, 300);
//     }
//   }
// };
