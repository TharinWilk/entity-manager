<script setup lang="ts">
defineProps({
  data: {
    type: Object as PropType<{
      value: { propertyValue: any; propertyKey: string };
      key: string | number;
    }>,
    default: undefined,
  },
});

const card = ref<HTMLElement>();

// Handle Dragging
const isDragging = ref(false);
const handleDragEvent = (event: Event) => {
  event.preventDefault();
  isDragging.value = true;
};

const handleDragEnd = (event: Event) => {
  event.preventDefault();

  isDragging.value = false;
};

// Handle Popover
const popover = ref();

const togglePopover = () => {
  !popover.value?.visible ? popover.value?.show() : popover.value?.close();
};

const isPopoverOpen = computed(() => popover.value?.visible || false);

// Handle Card Editing
const isEditingCard = ref<{
  status: boolean;
  input: string | undefined;
  addingNewValue: boolean;
}>({
  status: false,
  input: undefined,
  addingNewValue: false,
});

const editCard = (
  status: boolean = true,
  inputKey: string | undefined = undefined
) => {
  isEditingCard.value.status = status;
  isEditingCard.value.input = inputKey;
};

const toggleEdit = () => {
  editCard(!isEditingCard.value.status, undefined);
  togglePopover();
};

const isActivelyEditing = (inputName: string | number) => {
  return (
    !isEditingCard.value.status ||
    !(isEditingCard.value.input === inputName || !isEditingCard.value.input)
  );
};

const newProperty = ref({ key: "", value: undefined });

const addNewValue = () => {
  if (newProperty.value.key) {
    isEditingCard.value.addingNewValue = true;
  }
};

const createNewProperty = (value: string) => {
  if (!value) {
    return;
  }

  newProperty.value.value = convertValueType(value);
  emits("add:new-property", newProperty.value);

  isEditingCard.value.addingNewValue = false;
  nextTick(() => {
    newProperty.value.key = "";
  });
};

const convertValueType = (value: string) => {
  switch (true) {
    case value === "true":
      return true;
    case value === "false":
      return false;
    case value.startsWith("[") && value.endsWith("]"):
      return JSON.parse(value);
    case value.startsWith("{") && value.endsWith("}"):
      return JSON.parse(value);
    default:
      return value;
  }
};

const handleFocusout = () => {
  if (isEditingCard.value.input) {
    editCard(false, undefined);
  }
};

watch(
  () => isEditingCard.value.status,
  (newValue) => {
    if (!newValue) return;

    nextTick(() => {
      const input = card.value?.querySelector("input");

      if (!input) {
        console.error("could not find target input");
        return;
      }

      input.focus();
    });
  }
);

// Handle data
const emits = defineEmits([
  "duplicate",
  "delete:card",
  "update:data-key",
  "update:property-key",
  "update:property-value",
  "add:new-property",
  "delete:property",
]);

const updatePropertyValue = (
  event: Event,
  index: number | undefined,
  emitName: "update:data-key" | "update:property-key" | "update:property-value"
) => {
  const emittedData = computed(() => {
    return index
      ? { value: (event.target as HTMLInputElement)?.value, index }
      : (event.target as HTMLInputElement)?.value;
  });

  emits(emitName, emittedData.value);
  handleFocusout();
};
</script>

<template>
  <div
    v-if="data"
    ref="card"
    class="card bg-[var(--surface-lightened)] p-2 rounded-lg duration-500 relative"
    :class="{ dragging: isDragging }"
    @drag="handleDragEvent"
    @dragend="handleDragEnd"
  >
    <div
      class="flex justify-between items-center border-b border-[var(--text-secondary)] pb-2 relative"
    >
      <h2
        v-if="isActivelyEditing(data.key)"
        class="text-3xl capitalize w-full"
        @dblclick="editCard(true, data.key.toString())"
      >
        {{ data.key }}
      </h2>
      <BaseInput
        v-else
        class="!text-3xl capitalize"
        :value="data.key"
        @blur="(event: Event) => updatePropertyValue(event, undefined, 'update:data-key')"
        @keypress.enter="(event: Event) => updatePropertyValue(event, undefined, 'update:data-key')"
        @focusout="handleFocusout"
      />

      <BaseButton
        bg-color="var(--surface-lightened)"
        class="button-icon cursor-pointer p-1 grid place-items-center border relative"
        aria-haspopup="menu"
        :aria-expanded="isPopoverOpen"
        @click="togglePopover"
      >
        <Icon name="mdi:dots-vertical" class="h-6 w-6" />
      </BaseButton>

      <!-- Popover Menu -->
      <LazyBasePopover ref="popover" class="top-0 !ml-auto !mr-14 z-10">
        <div ref="dialogContent" class="grid gap-3">
          <BaseButton
            size="xs"
            class="text-base"
            @click="toggleEdit"
            :autofocus="isPopoverOpen"
            >Edit</BaseButton
          >
          <BaseButton
            size="xs"
            class="text-base"
            @click="$emit('duplicate', data.key)"
            >Duplicate</BaseButton
          >
          <BaseButton
            size="xs"
            class="text-base"
            @click="$emit('delete', data.key)"
            >Delete</BaseButton
          >
        </div>
      </LazyBasePopover>
    </div>

    <div class="py-2">
      <div
        v-for="(propertyValue, propertyKey, index) of data.value"
        :key="propertyKey"
        class="py-[1px]"
      >
        <span class="flex gap-1.5">
          <strong
            v-if="isActivelyEditing(propertyKey)"
            @dblclick="editCard(true, propertyKey)"
          >
            {{ propertyKey }}:
          </strong>
          <BaseInput
            v-else
            :value="Object.keys(data.value)[index]"
            @blur="(event: Event) => updatePropertyValue(event, index, 'update:property-key')"
            @keypress.enter="(event: Event) => updatePropertyValue(event, index, 'update:property-key')"
            @focusout="handleFocusout"
          />

          <span
            v-if="isActivelyEditing(propertyValue)"
            @dblclick="editCard(true, propertyValue)"
          >
            {{ propertyValue }}
          </span>
          <BaseInput
            v-else
            :value="Object.values(data.value)[index]"
            @blur="(event: Event) => updatePropertyValue(event, index, 'update:property-value')"
            @keypress.enter="(event: Event) => updatePropertyValue(event, index, 'update:property-value')"
            @focusout="handleFocusout"
          />

          <!-- Property buttons -->
          <ul
            v-if="isEditingCard.status"
            class="ml-auto flex gap-1.5 items-center"
          >
            <!-- Copy Button -->
            <li>
              <BaseButton
                size="xs"
                bg-color="var(--surface-lightened)"
                class="!rounded"
              >
                <Icon name="mdi:content-copy" size="16" />
                <BaseTooltip bottom>Copy {{ propertyKey }}</BaseTooltip>
              </BaseButton>
            </li>

            <!-- Drag Button -->
            <li>
              <BaseButton
                size="xs"
                bg-color="var(--surface-lightened)"
                class="!rounded"
              >
                <Icon name="mdi:cursor-move" size="16" />
                <BaseTooltip bottom>Move {{ propertyKey }}</BaseTooltip>
              </BaseButton>
            </li>

            <!-- Delete Button -->
            <li>
              <BaseButton
                size="xs"
                bg-color="var(--surface-lightened)"
                class="!rounded"
                @click="emits('delete:property', propertyKey)"
              >
                <Icon name="mdi:delete" size="16" />
                <BaseTooltip bottom>Delete {{ propertyKey }}</BaseTooltip>
              </BaseButton>
            </li>
          </ul>
        </span>
      </div>

      <!-- Add new property -->
      <div
        v-if="isEditingCard.status && !isEditingCard.input"
        class="flex gap-1.5"
      >
        <span>
          <BaseInput
            v-if="!isEditingCard.addingNewValue"
            v-model="newProperty.key"
            @blur="addNewValue()"
            @keypress.enter="addNewValue()"
            @focusout="handleFocusout"
          />
          <strong v-else>{{ newProperty.key }}:</strong>
        </span>

        <BaseInput
          v-if="isEditingCard.addingNewValue"
          @blur="(event: Event) => createNewProperty((event.target as HTMLInputElement).value)"
          @keypress.enter="(event: Event) => createNewProperty((event.target as HTMLInputElement).value)"
          @focusout="handleFocusout"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dragging {
  opacity: 0;
}

.card .input-wrapper {
  width: fit-content;
}
</style>
