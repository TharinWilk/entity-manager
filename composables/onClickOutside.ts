export function onClickOutside(targetElement: MaybeRef, callback: () => void) {
  const targetRef = toRef(targetElement);

  const handleClickOutside = (event: MouseEvent) => {
    if ((event.target as Node).nodeName === "DIALOG") return;

    if (targetRef.value && !targetRef.value.contains(event.target as Node)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
}
