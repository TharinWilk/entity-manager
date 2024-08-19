function convertJSONToHierarchicalCSV(jsonObject: any): string {
  let csvRows: string[][] = [];

  // Process each item in the root JSON object
  Object.keys(jsonObject).forEach((key) => {
    processObject(csvRows, 0, key, jsonObject[key]);
  });

  // Generate the CSV string
  return csvRows.map((row) => row.join(",")).join("\n");
}

// Helper function to process each object
function processObject(
  csvRows: string[][],
  level: number,
  key: string,
  obj: any
) {
  ensureRowExists(csvRows, csvRows.length);
  let row = csvRows[csvRows.length - 1];

  row[level] = key;

  Object.keys(obj).forEach((subKey) => {
    const value = obj[subKey];
    if (typeof value === "object" && !Array.isArray(value)) {
      // Recursively process nested objects
      processObject(csvRows, level + 1, subKey, value);
    } else if (Array.isArray(value)) {
      // Process arrays and spread values across the same row
      processArrayInSameRow(csvRows, level + 1, subKey, value);
    } else {
      ensureRowExists(csvRows, csvRows.length);
      row = csvRows[csvRows.length - 1];
      row[level + 1] = subKey;
      row[level + 2] = value;
    }
  });
}

// Process arrays by placing items in the same row across different columns
function processArrayInSameRow(
  csvRows: string[][],
  level: number,
  key: string,
  arr: any[]
) {
  ensureRowExists(csvRows, csvRows.length);
  let row = csvRows[csvRows.length - 1];

  row[level] = key;
  arr.forEach((item, index) => {
    row[level + 1 + index] = item;
  });
}

// Ensure that the row exists
function ensureRowExists(csvRows: string[][], index: number) {
  if (!csvRows[index]) {
    csvRows[index] = [];
  }
}

export function downloadCSV(jsonObject: object, filename: string): void {
  // Convert JSON to CSV
  const csvContent = convertJSONToHierarchicalCSV(jsonObject);

  // Create a Blob from the CSV string
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a hidden anchor element and set its attributes
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;

  // Programmatically click the anchor element to trigger the download
  anchor.click();

  // Clean up the URL object
  URL.revokeObjectURL(url);
}
