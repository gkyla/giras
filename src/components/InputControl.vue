<template>
  <div
    class="flex gap-6 mb-5"
    :class="[
      {
        'items-start': inputType !== 'input',
      },
    ]"
  >
    <div
      class="flex items-center gap-4"
      :class="[
        {
          'w-36': !labelWidth,
        },
        labelWidth,
      ]"
    >
      <label :for="identifier" class="font-semibold"><slot /> :</label>
    </div>
    <input
      type="text"
      :id="identifier"
      v-if="inputType === 'input'"
      class="border-2 border-slate-500 rounded-md shadow-sm p-2 min-w-[340px]"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <textarea
      name=""
      :id="identifier"
      :placeholder="placeholder"
      :cols="col"
      :rows="row"
      class="border-2 border-slate-500 rounded-md shadow-sm p-2"
      v-if="inputType === 'textarea'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <input
      type="file"
      :id="identifier"
      accept="image/png, image/jpeg"
      v-if="inputType === 'file'"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  inputType: {
    type: String,
    default: "input",
  },
  row: {
    default: "6",
  },
  col: {
    default: "60",
  },
  identifier: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  labelWidth: {
    type: String,
    /* value use tailwind width classes */
  },
  inputWidth: {
    type: String,
    /* value use tailwind width classes */
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped></style>
