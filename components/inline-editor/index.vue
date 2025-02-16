<script setup lang="ts">
defineProps({
  content: {
    type: String,
    default: "",
  },
  component: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
  },
});

const editing = ref(false);

defineEmits(["update:text"]);
</script>

<template>
  <component
    v-if="!editing"
    :is="component"
    class="w-fit"
    @dblclick="editing = true"
  >
    {{ content }}
  </component>

  <BaseInput
    v-else
    class=""
    :value="content"
    @blur="(event: InputEvent) => $emit('update:text', (event.target as HTMLInputElement)?.value)"
  />
</template>

<style></style>
