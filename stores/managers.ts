import type { Manager } from "~/types/manager";

export const useManagerStore = defineStore(
  "Managers",
  () => {
    const managers = ref<Manager[]>([]);

    const activeManagerName = ref();

    const addManager = (manager: any) => {
      managers.value.push(manager);
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
      );
    });

    return {
      managers,
      addManager,
      removeManager,
      getManagerIndex,
      setActiveManager,
      getActiveManager,
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
