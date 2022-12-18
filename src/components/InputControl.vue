<template>
  <div
    class="flex mb-5 gap-4"
    :class="[
      {
        'items-start': inputType !== 'input',
      },
    ]"
  >
    <div
      class="flex items-center gap-6"
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
      :class="[
        {
          'h-[400px]': !inputHeight,
          'w-[600px]': !inputWidth,
        },
        inputHeight,
        inputWidth,
      ]"
      v-if="inputType === 'textarea'"
    >
      <!-- Use @update:content instead @input for updating v-model -->
      <QuillEditor
        ref="quillEditor"
        v-model:content="quillModelValue"
        @update:content="$emit('update:modelValue', quillModelValue)"
        contentType="html"
        :options="quillOptions"
        @ready="onReady"
        @selectionChange="onSelectionChange"
        @textChange="onTextChange"
      ></QuillEditor>
    </div>

    <!-- Input = file -->
    <input
      type="file"
      :id="identifier"
      @change="getFile"
      accept="image/png, image/jpeg"
      v-if="inputType === 'file'"
    />

    <DatePicker
      v-if="inputType === 'date'"
      v-model="date"
      @update:model-value="$emit('update:modelValue', date)"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useInputState } from "../stores/inputState";

const emit = defineEmits(["update:modelValue"]);
const quillModelValue = ref(props.modelValue);
const quillEditor = ref(null);
const inputState = useInputState();
const date = ref(props.modelValue);

/* TODO: CUSTOM FORMat DATEPICKER */

function getFile(e) {
  console.log(e.target.files["0"]);
  console.log(typeof e.target.files);
}

function onReady() {
  if (props.inputType === "textarea") {
    inputState.$patch((state) => {
      state.quillEditor[props.identifier] = {
        el: quillEditor.value.getEditor().querySelector(".ql-editor"),
        identifier: props.identifier,
      };
    });
  }
}

function onSelectionChange() {
  if (props.inputType === "textarea") {
    inputState.$patch((state) => {
      state.quillEditor[props.identifier] = {
        el: quillEditor.value.getEditor().querySelector(".ql-editor"),
        identifier: props.identifier,
      };
    });
  }
}

function onTextChange() {
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

    validator(value) {
      return value.startsWith("w-"); /* Tailwind width classes */
    },
    /* value use tailwind width classes */
  },
  inputHeight: {
    type: String,

    validator(value) {
      return value.startsWith("h-"); /* Tailwind height classes */
    },
  },
});
</script>

<style lang="scss" scoped></style>
