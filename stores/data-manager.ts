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
    if (!data.value) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Error",
        message: "Failed to create new section.",
        cause: `No data.`,
      });
    }

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
    if (!data.value || !filter.value) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Error",
        message: "Failed to update.",
        cause: `No data.`,
      });
    }

    data.value[filter.value] = newData;
  };

  function updateDataIndexing(key: string, newIndexKey: string) {
    if (
      !data.value ||
      !(key in filteredData.value) ||
      !(newIndexKey in filteredData.value) ||
      !filter.value
    )
      return;

    const keys = Object.keys(filteredData.value);
    const index = keys.indexOf(key);
    const newIndex = keys.indexOf(newIndexKey);

    if (newIndex < 0 || newIndex >= keys.length) return;

    const newKeys = [...keys];
    newKeys.splice(index, 1);
    newKeys.splice(newIndex, 0, key);

    const reorderedData: { [key: string]: any } = {};

    newKeys.forEach((item) => {
      if (filteredData.value) {
        reorderedData[item] = filteredData.value[item];
      }
    });

    updateData(reorderedData);
  }

  const addNewDataField = (newField: string) => {
    if (!data.value || !filter.value) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Error",
        message: "Failed to update.",
        cause: `No data.`,
      });
    }

    data.value[filter.value][newField] = {};
  };

  const duplicateDataField = (fieldName: string) => {
    // Guard - No data - Handle error
    if (!data.value) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Error",
        message: "Failed to duplicate card.",
        cause: "No data found.",
      });
    }

    let filedCopiedSuccessfully = false;

    // Optimized delete when filter is present
    if (filter.value && data.value[filter.value][fieldName]) {
      const duplicate = { ...data.value[filter.value][fieldName] };
      const newFieldName = generateDuplicateFieldName(
        data.value,
        filter.value,
        fieldName
      );

      data.value[filter.value][newFieldName] = duplicate;
      return;
    }

    // Search all values when no filter is present
    Object.keys(data.value).forEach((section: string) => {
      if (!data.value) return;

      if (data.value[section][fieldName]) {
        const duplicate = { ...data.value[section][fieldName] };
        const newFieldName = generateDuplicateFieldName(
          data.value,
          section,
          fieldName
        );

        data.value[section][newFieldName] = duplicate;
        filedCopiedSuccessfully = true;
      }
    });

    // Handle no copy being created
    if (!filedCopiedSuccessfully) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Error",
        message: "Failed to duplicate card.",
        cause: `Field "${fieldName}" could not be found in any section.`,
      });
    }
  };

  const generateDuplicateFieldName = (
    data: { [key: string]: any },
    sectionName: string,
    fieldName: string
  ) => {
    // Check if the field being copied is a copy - Extract root name
    if (fieldName.startsWith("copy-")) {
      fieldName = fieldName.replace(/copy-/, "").replace(/-\d+$/, "");
    }

    // Get the current count of copies
    const existingCopies = Object.keys(data[sectionName]).filter((field) =>
      field.startsWith(`copy-${fieldName}`)
    );

    // Determine the new copy number
    let copyNumber = existingCopies.length > 0 ? existingCopies.length + 1 : 1;

    // Generate the new field name
    let newFieldName = `copy-${fieldName}-${copyNumber}`;

    // Ensure the new name is unique
    while (data[sectionName][newFieldName]) {
      copyNumber++;
      newFieldName = `copy-${fieldName}-${copyNumber}`;
    }

    return newFieldName;
  };

  const deleteDataField = (fieldName: string) => {
    // Guard - No data - Handle error
    if (!data.value) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Error",
        message: "Failed to delete card.",
        cause: "No data found.",
      });
    }

    let fieldDeleted = false;

    // Optimized delete when filter is present
    if (filter.value && data.value[filter.value][fieldName]) {
      delete data.value[filter.value][fieldName];
      return;
    }

    // Search all values when no filter is present
    Object.keys(data.value).forEach((section: string) => {
      if (!data.value) return;

      if (data.value[section][fieldName]) {
        delete data.value[section][fieldName];
        fieldDeleted = true;
      }
    });

    if (!fieldDeleted) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Error",
        message: "Failed to delete card.",
        cause: `Field "${fieldName}" could not be found in any section.`,
      });
    }
  };

  return {
    data,
    getSections,
    addNewKey,
    filter,
    setFilter,
    filteredData,
    updateData,
    updateDataIndexing,
    addNewDataField,
    duplicateDataField,
    deleteDataField,
  };
});
