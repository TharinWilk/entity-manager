<script setup lang="ts">
const props = defineProps({
  dialog: {
    type: Object as PropType<HTMLDialogElement>,
    default: undefined,
  },
});

const closeDialog = () => {
  dataName.value = "";
  removeError();
  props.dialog?.close();
};

// Manager Data Logic
const dataManagerStore = useDataManagerStore();
const dataName = ref("");

// Handle Form Submission
const handleSubmit = () => {
  const isValid = formValidation(dataName.value);

  if (!isValid) return;

  dataManagerStore.addNewKey(dataName.value);
  closeDialog();
};

// Error Logic
const error = ref("");
const removeError = () => {
  error.value = "";
};

// Form Validation
const formValidation = (input: string) => {
  let isValid = false;
  // Required Field Validation
  if (!input || input === "") {
    error.value = "This field is required";
    return isValid;
  }

  // Existing Name Validation
  const existingName = dataManagerStore.getSections.find(
    (sectionName) => sectionName === dataName.value
  );

  if (existingName) {
    error.value = "Name already exists";
    return isValid;
  }

  return (isValid = true);
};
</script>

<template>
  <form
    class="grid place-items-center gap-10 overflow-auto pb-8 px-2"
    @submit.prevent="handleSubmit"
  >
    <div class="grid gap-4 place-items-center">
      <label for="data-name" class="text-lg">New Data Section</label>
      <BaseInput
        id="data-name"
        v-model="dataName"
        placeholder="Name"
        :error="error"
        autofocus
        @clearError="removeError"
        class="w-full !text-xl"
      />
    </div>

    <div class="grid place-items-center w-full gap-4">
      <!-- Create New Section Button -->
      <BaseButton class="w-full" type="submit">Create New Data</BaseButton>
    </div>
  </form>
</template>

<style></style>
