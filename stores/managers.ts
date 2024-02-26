import testData from "~/data/test-data.json";
import homeData from "~/data/home-data.json";

export const useManagerStore = defineStore("Managers", () => {
  const activeManagerName = ref();

  const managers = ref([
    { name: "Home", icon: "house", data: homeData },
    { name: "Test", icon: "car", data: testData },
  ]);

  const addManager = (manager: any) => {
    managers.value.push(manager);
  };

  const setActiveManager = (managerName: string) => {
    activeManagerName.value = managerName;
  };

  const getActiveManager = computed(() => {
    return managers.value.find(
      (manager) => manager.name === activeManagerName.value
    );
  });

  return { managers, addManager, setActiveManager, getActiveManager };
});
