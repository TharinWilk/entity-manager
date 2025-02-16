<script setup lang="ts">
defineProps({
  propertyName: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["click"]);

const propertyActions = [
  {
    name: "Copy",
    iconName: "mdi:content-copy",
  },
  {
    name: "Move",
    iconName: "mdi:cursor-move",
  },
  {
    name: "Delete",
    iconName: "mdi:delete",
  },
];
</script>

<template>
  <ul
    class="ml-auto group-hover:visible flex gap-1.5 items-center w-fit invisible h-fit"
  >
    <li v-for="action in propertyActions" :key="action.name">
      <BaseButton
        size="xs"
        bg-color="var(--surface-lightest)"
        class="!rounded"
        @click="emits('click', action.name)"
      >
        <Icon :name="action.iconName" size="16" class="min-w-4" />
        <BaseTooltip bottom>{{ action.name }} {{ propertyName }}</BaseTooltip>
      </BaseButton>
    </li>
  </ul>
</template>

<style></style>
