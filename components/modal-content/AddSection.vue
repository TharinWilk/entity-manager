<script setup lang="ts">
const props = defineProps({
  dialog: {
    type: Object as PropType<HTMLDialogElement>,
    default: undefined,
  },
});
const { themeColor } = useTheme();

const dataName = ref("");
const dataManagerStore = useDataManagerStore();

const closeDialog = () => {
  props.dialog?.close();
};

const error = ref("");

const handleSubmit = () => {
  const isValid = formValidation(dataName.value);

  if (!isValid) return;

  dataManagerStore.addNewKey(dataName.value);
  closeDialog();
};

const removeError = () => {
  error.value = "";
};

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
  <section
    class="px-8 py-4 grid rounded-lg w-full gap-10 max-h-dvh overflow-hidden"
  >
    <!-- Header Section -->
    <header
      class="flex justify-between items-center border-b-2 border-white pb-4"
    >
      <!-- Heading -->
      <h2 class="text-xl sm:text-2xl">Create New Data</h2>

      <!-- Close Button -->
      <LazyBaseButton size="xs" class="!rounded-full" @click="closeDialog">
        <span class="sr-only">Close Popup</span>
        <Icon name="mdi:close" size="16" :color="themeColor" />
      </LazyBaseButton>
    </header>

    <!-- Form Section -->
    <form
      class="grid place-items-center gap-10 overflow-auto pb-8 px-2"
      @submit.prevent="handleSubmit"
    >
      <div class="grid gap-4 place-items-center">
        <label for="manager-name" class="text-lg">New Data Section</label>
        <BaseInput
          id="manager-name"
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
  </section>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: 250ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
