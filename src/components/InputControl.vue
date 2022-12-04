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

    <!-- Default Input -->
    <input
      type="text"
      :id="identifier"
      v-if="inputType === 'input'"
      class="border-2 border-slate-500 rounded-md shadow-sm p-2 min-w-[340px]"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <!-- Textarea, use Quill  -->
    <div
      class="w-[600px]"
      :class="[
        {
          'h-[400px]': !inputHeight,
        },
        inputHeight,
      ]"
      v-if="inputType === 'textarea'"
    >
      <QuillEditor
        v-model:content="quillModelValue"
        @input="$emit('update:modelValue', quillModelValue)"
        contentType="html"
        :options="quillOptions"
        @update:content="onEditorReady"
      ></QuillEditor>
    </div>

    <!-- Input = file -->
    <input
      type="file"
      :id="identifier"
      accept="image/png, image/jpeg"
      v-if="inputType === 'file'"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const quillModelValue = ref(props.modelValue);

function onEditorReady(e) {
  console.log(quillModelValue.value);
}

const quillOptions = reactive({
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "link", "blockquote", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  },
  placeholder: "Saat itu ketika aku ...",
  theme: "snow",
});

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
  inputHeight: {
    type: String,

    validator(value) {
      return value.startsWith("h-"); /* Tailwind height classes */
    },
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped></style>
