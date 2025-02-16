<script setup lang="ts">
import type { BaseDialog } from "~/types/components";

const props = defineProps({
  dialog: {
    type: Object as PropType<BaseDialog>,
    required: true,
  },
});

// Handle Close Dialog Logic
const closeDialog = () => {
  managerName.value = "";
  removeError();
  props.dialog?.close();
};

// Manager Name Logic
const managerStore = useManagerStore();
const managerName = ref();

// Choose Icon Logic
const iconList = ["star", "folder", "file-cabinet", "pencil", "car", "gamepad"];
const selectedIcon = ref();
const isSelectingIcon = ref(false);

const updateIsSelectingIcon = (value: boolean) => {
  isSelectingIcon.value = value;
};

const selectIcon = (icon: string) => {
  selectedIcon.value = icon;
  updateIsSelectingIcon(false);
};

// Setup Initial Form Data
const setFormValues = () => {
  if (!managerStore.getActiveManager) {
    console.error("No active manager");
    return;
  }

  const { name, icon } = managerStore.getActiveManager;
  managerName.value = name;
  selectIcon(icon);
};

onMounted(() => {
  setFormValues();
});

watch(
  () => props.dialog.visible,
  () => setFormValues()
);

// Handle Submit
const handleSubmit = () => {
  const isValid = formValidation(managerName.value);

  if (!isValid) return;

  managerStore.updateManager(managerName.value, selectedIcon.value);

  closeDialog();
};

// Errors Logic
const error = ref("");
const removeError = () => {
  error.value = "";
};

// Handle Form Validation
const formValidation = (input: string) => {
  let isValid = false;
  // Required Field Validation
  if (!input || input === "") {
    error.value = "This field is required";
    return isValid;
  }

  return (isValid = true);
};

// Set Icon Color
const { themeColor } = useTheme();

function clearForm() {
  managerName.value = "";
  removeError();
}

defineExpose({ clearForm, isSelectingIcon, updateIsSelectingIcon, selectIcon });
</script>

<template>
  <!-- Form Section -->
  <transition name="fade" mode="out-in">
    <form
      v-if="!isSelectingIcon"
      class="grid place-items-center gap-10 overflow-auto pb-8 px-2"
      @submit.prevent="handleSubmit"
    >
      <div class="grid gap-4 place-items-center">
        <label for="manager-name" class="text-lg">New Manager Name</label>
        <BaseInput
          id="manager-name"
          v-model="managerName"
          placeholder="Name"
          :error="error"
          autofocus
          class="w-full !text-xl"
          @clear-error="removeError"
        />
      </div>

      <div class="grid gap-4 place-items-center">
        <span>Select Icon</span>
        <BaseButton @click="updateIsSelectingIcon(true)">
          <span class="sr-only">Close Popup</span>
          <Icon :name="`mdi:${selectedIcon}`" size="32" :color="themeColor" />
        </BaseButton>
      </div>

      <div class="grid place-items-center w-full gap-4">
        <!-- Upload Existing File  -->

        <!-- Update Manager -->
        <BaseButton class="w-full" type="submit">Update Manager</BaseButton>
      </div>
    </form>

    <section v-else class="grid place-items-center gap-4 w-full">
      <p>Select Icon</p>
      <div class="flex flex-wrap gap-4 items-center justify-center">
        <BaseButton
          v-for="icon in iconList"
          :key="icon"
          @click="selectIcon(icon)"
        >
          <span class="sr-only">Select {{ icon }} icon</span>
          <Icon :name="`mdi:${icon}`" size="32" :color="themeColor" />
        </BaseButton>
      </div>
    </section>
  </transition>
</template>

<style></style>
