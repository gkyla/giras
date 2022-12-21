<template>
  <form class="mb-10" @submit.prevent="handleEditSectionTitle">
    <InputControl identifier="Headline" v-model="currentData.sectionTitle"
      >Section tittle</InputControl
    >
    <div class="flex gap-2">
      <button
        class="ml-auto"
        :class="{
          btn_close_clickable: isRevertableSectionTitle,
          btn_close_unclickable: !isRevertableSectionTitle,
        }"
        @click.self="handleRevertSectionTitle"
        type="button"
      >
        Revert
      </button>
      <button class="btn_save" type="submit">Save</button>
    </div>
  </form>
  <div class="border border-slate-200 w-full mb-10"></div>

  <form @submit.prevent="editAboutme">
    <InputControl identifier="image1" input-type="file">Display Image</InputControl>
    <InputControl
      identifier="aboutMeEdit"
      input-type="textarea"
      input-height="h-[230px]"
      input-width="w-[680px]"
      v-model="currentData.content"
      >Content</InputControl
    >
    <div class="flex mt-16 gap-2 self-end">
      <button
        class="ml-auto"
        :class="{
          btn_close_clickable: isRevertableContent,
          btn_close_unclickable: !isRevertableContent,
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

const isRevertableContent = ref(false);
const isRevertableSectionTitle = ref(false);
let currentData = reactive({
  sectionTitle: aboutMeState.sectionTitle,
  displayImage: aboutMeState.displayImage,
  content: aboutMeState.content,
});

watch(currentData, (newVal, oldVal) => {
  if (newVal.content === aboutMeState.content) {
    isRevertableContent.value = false;
  } else {
    isRevertableContent.value = true;
  }

  if (newVal.sectionTitle === aboutMeState.sectionTitle) {
    isRevertableSectionTitle.value = false;
  } else {
    isRevertableSectionTitle.value = true;
  }
});

function handleEditSectionTitle() {
  aboutMeState.$patch({
    sectionTitle: currentData.sectionTitle,
  });

  isRevertableSectionTitle.value = false;
}

function handleRevertSectionTitle() {
  currentData.sectionTitle = aboutMeState.sectionTitle;
}

function handleRevert() {
  currentData.content = aboutMeState.content;

  inputState.quillEditor["aboutMeEdit"].el.innerHTML = aboutMeState.content;
}

function editAboutme() {
  aboutMeState.$patch({
    displayImage: currentData.displayImage,
    content: currentData.content,
  });

  inputState.quillEditor["aboutMeEdit"].el.innerHTML = aboutMeState.content;

  isRevertableContent.value = false;
}
</script>

<style lang="scss" scoped></style>
