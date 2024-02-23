export const useManagerStore = defineStore("Managers", () => {
  const managers = ref([
    { name: "Home", icon: "house" },
    { name: "Test", icon: "car" },
  ]);

  const addManager = (manager: any) => {
    managers.value.push(manager);
  };

  return { managers, addManager };
});
