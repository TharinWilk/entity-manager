export const useManagerStore = defineStore(
  "Managers",
  () => {
    type Manager = {
      name: string;
      icon: string;
      data: any;
    };

    const managers = ref<Manager[]>([]);

    const activeManagerName = ref();

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
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        maxAge: 315360000,
      }),
    },
  }
);
