<script setup lang="ts">
const { themeColor } = useTheme();
const managerName = ref("");
const managerStore = useManagerStore();

const closeDialog = () => {
  const dialog = document.querySelector("dialog");

  dialog?.close();
};

const selectedIcon = ref("");
const iconList = ["star", "folder", "file-cabinet", "pencil", "car", "gamepad"];

const isSelectingIcon = ref(false);

const selectIcon = (icon: string) => {
  selectedIcon.value = icon;
  isSelectingIcon.value = false;
};

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * iconList.length);
  selectedIcon.value = iconList[randomIndex];
});

const error = ref("");

const handleSubmit = () => {
  const isValid = formValidation(managerName.value);

  if (!isValid) return;

  managerStore.addManager({ name: managerName, icon: selectedIcon });
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
  const existingManager = managerStore.managers.find(
    (manager) => manager.name == managerName.value
  );

  if (existingManager) {
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
      <h2 class="text-xl sm:text-2xl">Create New Manager</h2>

      <!-- Close Button -->
      <LazyBaseButton size="xs" class="!rounded-full" @click="closeDialog">
        <span class="sr-only">Close Popup</span>
        <Icon name="mdi:close" size="16" :color="themeColor" />
      </LazyBaseButton>
    </header>

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
            @clearError="removeError"
            class="w-full !text-xl"
          />
        </div>

        <div class="grid gap-4 place-items-center">
          <span>Select Icon</span>
          <BaseButton @click="isSelectingIcon = true">
            <span class="sr-only">Close Popup</span>
            <Icon :name="`mdi:${selectedIcon}`" size="32" :color="themeColor" />
          </BaseButton>
        </div>

        <div class="grid place-items-center w-full gap-4">
          <!--  -->
          <BaseButton class="w-full" type="submit"
            >Create New Manager</BaseButton
          >
          <!-- Upload Existing File  -->
          <BaseButton class="w-full">Upload Existing File</BaseButton>
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
