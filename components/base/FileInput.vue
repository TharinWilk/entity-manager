<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const { labelDefault } = defineProps({
  labelDefault: {
    type: String,
    default: "Upload Existing File",
  },
});

// Handle File Input
const emits = defineEmits(["onUpload"]);
defineExpose({ clear });

const file = ref();
const data = ref();
const error = ref("");

// Handle Button Label
const label = computed(() => {
  return file.value ? file.value.name : labelDefault;
});

const handleChange = async (event: Event) => {
  // Guard - No input or files found.
  const input = event.target as HTMLInputElement;
  if (!input.files || !input.files[0]) return;

  // Check file type - Throw error when file type is invalid.
  const acceptedFileTypes = input.accept;

  if (!acceptedFileTypes.includes(input.files[0].type)) {
    file.value = undefined;
    error.value = "File type not supported";
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Error",
      message: "Failed to upload.",
      cause: `Unsupported file type: ${input.files[0].type}`,
    });
  } else error.value = "";

  // Retrieve, read, store, and emit file and data values.
  file.value = input.files[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    const fileContent = e.target?.result;
    if (typeof fileContent === "string") {
      try {
        if (file.value.type == "text/csv") {
          data.value = convertCSVToJSON(fileContent);
        } else {
          data.value = JSON.parse(fileContent);
        }
        emits("onUpload", { file: file.value, data: data.value });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  };

  reader.readAsText(input.files[0]);
};

function clear() {
  data.value = undefined;
  file.value = undefined;
  error.value = "";
}
</script>

<template>
  <div class="relative w-full">
    <label>
      <input
        type="file"
        :class="{ error: error }"
        @change="handleChange"
        v-bind="$attrs"
      />
      {{ label }}
    </label>
    <span v-if="error" class="error-message">
      <Icon name="mdi:information-slab-circle" class="h-[14px] w-[14px]" />
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
input[type="file"] {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
}

label {
  --size: 1rem;
  --bg-color: var(--surface-default);

  position: relative;
  display: grid;
  place-items: center;
  padding: calc(var(--size) / 4);

  box-shadow: 0px 0px 2px 0px var(--surface-shadow-bottom);
  border-radius: 0.5rem;

  background-color: var(--bg-color);

  transition: scale 200ms linear, box-shadow 200ms linear,
    outline-offset 200ms linear;

  cursor: pointer;

  &:has(input[type="file"]:focus-visible) {
    outline-offset: 2px;
    outline: 3px solid var(--surface-shadow-bottom);
  }

  &:has(input[type="file"]:focus-visible:active) {
    outline-offset: 0px;
    scale: 1;
  }

  &:hover {
    scale: 1;
    box-shadow: 0px 2px 4px 0px var(--surface-shadow-bottom),
      0px -2px 4px 0px var(--surface-shadow-top);
  }

  &:active {
    transition: 75ms;
    scale: 0.96;
    box-shadow: 0px 0px 2px 0px var(--surface-shadow-bottom);
  }
}

.error {
  outline-color: var(--error-color);
}

.error-message {
  /* position: absolute; */
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.5rem;

  display: flex;
  align-items: center;
  gap: 0.25rem;

  color: var(--error-color);
  font-size: 0.875rem;
  line-height: 0;
}
</style>
