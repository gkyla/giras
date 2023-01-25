<template>
  <div
    class="flex flex-col sm:flex-row mb-5 gap-4"
    :class="[
      {
        'items-start': inputType !== 'input',
      },
    ]"
  >
    <div class="flex items-center gap-6">
      <label :for="identifier" class="font-semibold w-full"
        ><p
          :class="[
            {
              'w-36': !labelWidth,
            },
            labelWidth,
          ]"
        >
          <slot /> :
        </p></label
      >
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

    <!-- Password -->
    <input
      type="password"
      :id="identifier"
      v-if="inputType === 'password'"
      class="border-2 border-slate-500 rounded-md shadow-sm p-2 min-w-[340px]"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <!-- Textarea, use Quill  -->
    <div
      class="h-[200px] max-w-full"
      :class="[inputWidth, inputHeight]"
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
      accept="image/*"
      v-if="inputType === 'file'"
    />

    <DatePicker
      v-if="inputType === 'date'"
      v-model="date"
      ref="datePickerEl"
      format="EEEE, d MMMM yyyy"
      @update:model-value="$emit('update:modelValue', date)"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from "vue";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useInputState } from "../stores/inputState";
import { errorModal } from "../libs/utils";

const emit = defineEmits(["update:modelValue", "inputedFile"]);
const swal = inject("$swal");
const quillModelValue = ref(props.modelValue);
const quillEditor = ref(null);
const inputState = useInputState();
const date = ref(props.modelValue);
const datePickerEl = ref(null);

function getFile(e) {
  try {
    const fileTypes = [
      "image/apng",
      "image/bmp",
      "image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/svg+xml",
      "image/tiff",
      "image/webp",
      "image/x-icon",
    ];
    const file = e.target.files[0];
    function validFileType() {
      if (file) {
        console.log(file.type);
        return fileTypes.includes(file.type);
      }
    }

    if (validFileType()) {
      emit("inputedFile", file);
    } else {
      // throw so we can catch it and show the errorModal
      throw Error("You can only upload image");
    }
  } catch (error) {
    errorModal(swal, error);
  }
}

onMounted(() => {
  if (props.inputType === "date") {
    inputState.$patch((state) => {
      state.datePicker[props.identifier] = {
        el: datePickerEl.value,
      };
    });
  }
});

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
  // console.log(quillModelValue.value);
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
    type: [String, Date],
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

<style>
/* Datepicker element */
.dp__input_wrap {
  width: 350px;
}
</style>
