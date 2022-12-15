<template>
  <form @submit.prevent="editAboutme">
    <InputControl identifier="image1" input-type="file">display Image</InputControl>
    <InputControl
      identifier="aboutMeEdit"
      input-type="textarea"
      input-height="h-[230px]"
      input-width="w-[680px]"
      v-model="currentData.content"
      >About me</InputControl
    >
    <div class="flex mt-16 gap-2 self-end">
      <button
        class="ml-auto"
        :class="{
          btn_close_clickable: isRevertable,
          btn_close_unclickable: !isRevertable,
        }"
        @click.self="handleRevert"
        type="button"
      >
        Revert
      </button>
      <button class="btn_save" type="submit">Save</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from "vue";

import InputControl from "../../components/InputControl.vue";
import { useInputState } from "../../stores/inputState";
import { useAboutMe } from "../../stores/aboutMe";

const aboutMeState = useAboutMe();
const inputState = useInputState();

const isRevertable = ref(false);
let currentData = reactive({
  displayImage: aboutMeState.displayImage,
  content: aboutMeState.content,
});

watch(currentData, (newVal, oldVal) => {
  if (newVal.content === aboutMeState.content) {
    isRevertable.value = false;
  } else {
    isRevertable.value = true;
  }
});

function handleRevert() {
  currentData = aboutMeState.revert(currentData);

  inputState.quillEditor["aboutMeEdit"].el.innerHTML = aboutMeState.content;
}

function editAboutme() {
  aboutMeState.edit(currentData);

  inputState.quillEditor["aboutMeEdit"].el.innerHTML = aboutMeState.content;
}
</script>

<style lang="scss" scoped></style>
