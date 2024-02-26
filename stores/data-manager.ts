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

  return { data, getSections, addNewKey };
});
