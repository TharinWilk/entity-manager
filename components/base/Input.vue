<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
  },
  error: {
    type: String,
    default: undefined,
  },
});

const emits = defineEmits(["update:modelValue", "clearError"]);

const handleInput = (value: string) => {
  emits("update:modelValue", value);
  emits("clearError"); // Emit event to clear the error
};
</script>

<template>
  <div class="relative w-full">
    <input
      type="text"
      class="base-input"
      :class="{ error: error }"
      :value="modelValue"
      @input="handleInput(($event.target as HTMLInputElement)?.value)"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style scoped>
.base-input {
  --size: 1rem;
  --shadow-color: var(--surface-shadow-top);

  /* width: min(100%, 480px); */
  padding: calc(var(--size) / 4) var(--size);
  border-radius: 0.5rem;
  outline: 3px solid transparent;

  font-size: 1rem;
  background-color: var(--surface-default);

  transition: outline-color 200ms ease;

  &:focus:not(.error),
  &:hover:not(.error) {
    outline-color: var(--surface-shadow-bottom);
  }
}

.error {
  outline-color: red;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.125rem;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
}

[data-theme="light"] .base-input {
  --shadow-color: var(--surface-shadow-bottom);
  box-shadow: inset 0px 1px 5px var(--shadow-color);
}

[data-theme="dark"] .base-input {
  --shadow-color: var(--surface-shadow-top);
  box-shadow: inset 0px 5px 12px var(--shadow-color);
}
</style>
