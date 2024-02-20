<script setup lang="ts">
const { themeColor } = useTheme();
const managerName = ref("");

const closeDialog = () => {
  const dialog = document.querySelector("dialog");

  dialog?.close();
};
</script>

<template>
  <section class="px-8 py-4 grid rounded-lg w-full gap-10">
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
    <form class="grid place-items-center gap-10">
      <div class="grid gap-4 place-items-center">
        <label for="manager-name" class="text-lg">New Manager Name</label>
        <BaseInput
          id="manager-name"
          placeholder="Folder Name"
          v-model="managerName"
          class="w-full !text-xl"
        />
      </div>

      <div class="grid place-items-center w-full gap-4">
        <!--  -->
        <BaseButton class="w-full">Create New Manager</BaseButton>
        <!-- Upload Existing File  -->
        <BaseButton class="w-full">Upload Existing File</BaseButton>
      </div>
    </form>
  </section>
</template>

<style></style>
