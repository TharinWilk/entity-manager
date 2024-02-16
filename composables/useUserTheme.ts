export const useUserTheme = () => {
  const theme = ref("light");

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

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("theme-preference", theme.value);

    document.documentElement.setAttribute("data-theme", theme.value);
  };

  onMounted(() => {
    theme.value = userPreference.value;
    document.documentElement.setAttribute("data-theme", theme.value);
  });

  return {
    userPreference,
    toggleTheme,
  };
};
