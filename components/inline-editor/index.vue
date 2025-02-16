<script setup lang="ts">
defineProps({
  content: {
    type: String,
    default: "",
  },
  component: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: "span",
  },
});

const editing = ref(false);

defineEmits(["update:text"]);
</script>

<template>
  <component
    :is="component"
    v-if="!editing"
    class="w-fit"
    @dblclick="editing = true"
  >
    {{ content }}
  </component>

  <BaseInput
    v-else
    :value="content"
    @blur="(event: InputEvent) => $emit('update:text', (event.target as HTMLInputElement)?.value)"
  />
</template>

<style></style>
