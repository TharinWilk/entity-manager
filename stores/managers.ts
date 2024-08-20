import type { Manager } from "~/types/manager";

export const useManagerStore = defineStore(
  "Managers",
  () => {
    const managers = ref<Manager[]>([]);

    const activeManagerName = ref();

    const addManager = (manager: any) => {
      managers.value.push(manager);
    };

    const updateManager = (name: string, icon: string) => {
      // Get manager index
      const managerIndex = getManagerIndex(getActiveManager.value);

      // Set new values
      managers.value[managerIndex].name = name;
      managers.value[managerIndex].icon = icon;

      // Update Active Manager - Name Changed
      setActiveManager(name);
    };

    const removeManager = (indexToRemove: number) => {
      managers.value.splice(indexToRemove, 1);
    };

    const getManagerIndex = (manager: Manager) => {
      return managers.value.indexOf(manager);
    };

    const setActiveManager = (managerName: string) => {
      activeManagerName.value = managerName;
    };

    const getActiveManager = computed(() => {
      return managers.value.find(
        (manager) => manager.name === activeManagerName.value
      ) as Manager;
    });

    const downloadManager = () => {
      if (!getActiveManager.value) {
        console.error("No data to download.");
        return;
      }

      const { name, data } = getActiveManager.value;

      downloadCSV(data, name);
    };

    return {
      managers,
      addManager,
      updateManager,
      removeManager,
      getManagerIndex,
      setActiveManager,
      getActiveManager,
      downloadManager,
    };
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        maxAge: 315360000,
      }),
    },
  }
);
