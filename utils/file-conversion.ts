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

export function convertCSVToJSON(csvString: string): any {
  // Convert CVS into rows of comma separated data
  const rows = csvString
    .trim()
    .split("\n")
    .map((row) => row.split(","));

  // Initialize json object and track hierarchy of data
  const jsonObject: any = {};
  const stack: any[] = [{ obj: jsonObject, key: null }];

  rows.forEach((row) => {
    // Determine the indentation level by finding the first non-empty cell
    let level = row.findIndex((cell) => cell.trim() !== "");
    const key = row[level].trim(); // Get the key at the current level
    const value = row.slice(level + 1).filter((cell) => cell.trim() !== ""); // Extract values in subsequent columns

    // Adjust the stack to the current level
    stack.length = level + 1;

    // Handle object creation or value assignment
    if (value.length === 0) {
      // Create a new object
      stack[level].obj[key] = {};
      stack.push({ obj: stack[level].obj[key], key });
    } else if (value.length === 1) {
      // Assign a single value
      stack[level].obj[key] = value[0];
    } else {
      // Assign an array of values
      stack[level].obj[key] = value;
    }
  });

  return jsonObject;
}
