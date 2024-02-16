/**
 * The useTheme composable handles stateful logic for managing the
 * "light" and "dark" theme of the site based on user preferences
 * and controls.
 *
 * Functionality
 *  - theme: Ref that contains the current theme.
 *
 *  - themeColor: Computed that returns text / icon colors,
 *    "white" for dark theme or "black" for light theme.
 *
 *  - userPreference: Computed that checks the user's
 *    browser storage and UI preferences to determine
 *    the user's preferred theme.
 *    - Note: Local storage is prioritized.
 *
 *  - onMounted hook: Sets the initial desired theme based on the
 *    userPreference computed value.
 *
 *  - toggleTheme: A function that toggles the theme value and sets
 *    the local storage value.
 *
 * @returns themeColor, userPreference, toggleTheme
 */

export const useTheme = () => {
  const theme = ref("light");

  const themeColor = computed(() => {
    return theme.value === "dark" ? "white" : "black";
  });

  const userPreference = computed(() => {
    // Return if on window present - CSR Only
    if (!window) return theme.value;

    const siteSettings = localStorage.getItem("theme-preference");
    const systemSettings = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return siteSettings || systemSettings;
  });

  onMounted(() => {
    theme.value = userPreference.value;
    document.documentElement.setAttribute("data-theme", theme.value);
  });

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("theme-preference", theme.value);

    document.documentElement.setAttribute("data-theme", theme.value);
  };

  return {
    themeColor,
    userPreference,
    toggleTheme,
  };
};
