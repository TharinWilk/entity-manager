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
  emits("clearError");
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
    <span v-if="error" class="error-message">
      <Icon name="mdi:information-slab-circle" class="h-[14px] w-[14px]" />
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
.base-input {
  --size: 1rem;
  --shadow-color: var(--surface-shadow-top);

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
  outline-color: var(--error-color);
}

.error-message {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.5rem;

  display: flex;
  align-items: center;
  gap: 0.25rem;

  color: var(--error-color);
  font-size: 0.875rem;
  line-height: 0;
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
