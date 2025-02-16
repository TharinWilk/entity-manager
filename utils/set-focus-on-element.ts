export const setFocusOnElement = (
  parentElement: HTMLElement,
  elementSelector: string = "[autofocus]"
) => {
  const focusElement = parentElement?.querySelector(
    elementSelector
  ) as HTMLElement;

  if (focusElement) {
    focusElement.focus();
  }
};
