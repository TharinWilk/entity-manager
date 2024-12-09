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
    class="text-3xl capitalize w-full"
    @dblclick="editing = true"
  >
    {{ content }}
  </component>

  <BaseInput
    v-else
    class="!text-3xl capitalize"
    :value="content"
    @input="$emit('update:text')"
  />
</template>

<style></style>
