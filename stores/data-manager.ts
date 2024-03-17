export const useDataManagerStore = defineStore("data manager", () => {
  const managerStore = useManagerStore();

  const data = ref<{ [key: string]: any }>();

  const setData = () => {
    data.value = managerStore.getActiveManager?.data;
  };

  const getSections = computed(() => {
    const activeManager = managerStore.getActiveManager!;

    if (!activeManager || !activeManager.data) {
      return [];
    }

    const data = activeManager.data;
    const namesArray = Object.keys(data);

    return namesArray;
  });

  watch([getSections, data], () => {
    setData();
  });

  const addNewKey = (newKey: string) => {
    if (!data.value) return;

    data.value[newKey] = {};
  };

  const filter = ref("");

  const setFilter = (input: string) => {
    filter.value = input;
  };

  const filteredData = computed(() => {
    // Guard for no data
    if (!data.value) {
      return {};
    }

    // Return filtered data
    if (filter.value) {
      return data.value[filter.value];
    }

    // Return all data
    const allObjectsData = {};
    const allDataKeys = Object.keys(data.value);

    allDataKeys.forEach((key) => {
      if (!data.value) return;

      Object.assign(allObjectsData, data.value[key]);
    });

    return allObjectsData;
  });

  const updateData = (newData: any) => {
    if (!data.value || !filter.value) return;

    data.value[filter.value] = newData;
  };

  return {
    data,
    getSections,
    addNewKey,
    filter,
    setFilter,
    filteredData,
    updateData,
  };
});
