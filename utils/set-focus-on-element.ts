export const setFocusOnElement = (
  parentElement: any,
  elementSelector: string = "[autofocus]"
) => {
  const focusElement = parentElement?.querySelector(
    elementSelector
  ) as HTMLElement;

  if (focusElement) {
    focusElement.focus();
  }
};
