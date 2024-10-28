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
      isEqual(property, copiedProperty)
    );

    if (propertyIsAlreadyCopied) {
      console.warn("property already exists");
      return;
    }

    copiedProperties.value.push(copiedProperty);
  };

  function isEqual(objA: any, objB: any): boolean {
    if (objA === objB) return true; // Check for reference equality
    if (objA == null || objB == null) return false; // Check for null or undefined
    if (typeof objA !== "object" || typeof objB !== "object") return false; // Check for non-objects

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false; // Different number of keys

    for (const key of keysA) {
      if (!keysB.includes(key) || !isEqual(objA[key], objB[key])) {
        return false; // Recursive check for deep equality
      }
    }

    return true; // All checks passed, objects are equal
  }

  return { copyProperty };
});
