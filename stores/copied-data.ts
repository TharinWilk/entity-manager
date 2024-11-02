export const useCopiedDataStore = defineStore("Copied Data", () => {
  const dataStore = useDataManagerStore();
  const { filteredData: data } = storeToRefs(dataStore);

  const copiedProperties = ref<{ [key: string]: any }[]>([]);

  const copyProperty = (dataKey: string | number, propertyKey: string) => {
    // Guard - no data
    if (!data.value) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Error",
        message: "Failed to copy property.",
        cause: "No data.",
      });
    }

    const copiedProperty = { [propertyKey]: data.value[dataKey][propertyKey] };

    // Check if the property is already copied
    const propertyIsAlreadyCopied = copiedProperties.value.some((property) =>
      checkObjectsForEquality(property, copiedProperty)
    );

    if (propertyIsAlreadyCopied) {
      console.warn("property already exists");
      return;
    }

    copiedProperties.value.push(copiedProperty);
  };

  function checkObjectsForEquality(objectA: any, objectB: any): boolean {
    // Check for reference equality
    if (objectA === objectB) return true;

    // Check for null or undefined
    if (objectA == null || objectB == null) return false;

    // Check for non-objects
    if (typeof objectA !== "object" || typeof objectB !== "object")
      return false;

    const keysA = Object.keys(objectA);
    const keysB = Object.keys(objectB);

    // Different number of keys
    if (keysA.length !== keysB.length) return false;

    // Recursive check for deep equality
    for (const key of keysA) {
      if (
        !keysB.includes(key) ||
        !checkObjectsForEquality(objectA[key], objectB[key])
      ) {
        return false;
      }
    }

    return true;
  }

  function removeCopiedProperty(index: number) {
    copiedProperties.value.splice(index, 1);
  }

  return { copiedProperties, copyProperty, removeCopiedProperty };
});
