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
    <div class="h-[400px] w-[600px]" v-if="inputType === 'textarea'">
      <QuillEditor
        theme="snow"
        v-model:content="quillModelValue"
        @input="$emit('update:modelValue', quillModelValue)"
        contentType="delta"
        @ready="onEditorReady($event)"
      ></QuillEditor>
    </div>
    <!-- <textarea
      name=""
      :id="identifier"
      :placeholder="placeholder"
      :cols="col"
      :rows="row"
      class="border-2 border-slate-500 rounded-md shadow-sm p-2"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea> -->
    <input
      type="file"
      :id="identifier"
      accept="image/png, image/jpeg"
      v-if="inputType === 'file'"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const quillModelValue = ref(props.modelValue);

function onEditorReady(e) {
  console.log(e.getContents());
}

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
