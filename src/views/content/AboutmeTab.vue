<template>
  <form @submit.prevent="editAboutme">
    <div v-if="isChangeImg" class="grid items-center gap-4 rounded">
      <div class="flex">
        <InputControl
          identifier="imageAboutMe"
          input-type="file"
          @inputedFile="getImage"
          >Image</InputControl
        >
      </div>
      <div class="flex gap-4 mb-5">
        <div class="flex items-center gap-6 w-36"></div>
        <img
          class="max-w-[100px] max-h-[100px] rounded-md"
          :src="currentAboutMe.imgLink"
          :alt="currentAboutMe.title"
        />
        <button
          class="underline underline-offset-2 font-bold ml-2 hover:text-slate-600 transition-all"
          type="button"
          @click="isChangeImg = false"
        >
          Keep image
        </button>
      </div>
    </div>
    <div class="flex gap-4 mb-5" v-show="!isChangeImg">
      <div class="flex items-center gap-6 w-36">
        <span class="font-bold">Image :</span>
      </div>
      <div class="flex">
        <img
          class="max-w-[100px] max-h-[100px] rounded-md"
          :src="currentAboutMe.imgLink"
          :alt="currentAboutMe.title"
        />
        <button
          class="underline underline-offset-2 font-bold ml-6 hover:text-slate-600 transition-all"
          type="button"
          @click="isChangeImg = true"
        >
          Change image
        </button>
      </div>
    </div>
    <InputControl
      identifier="aboutMeEdit"
      input-type="textarea"
      input-height="h-[230px]"
      input-width="w-[680px]"
      v-model="currentAboutMe.content"
      >Content</InputControl
    >
    <div class="flex mt-16 gap-2 self-end">
      <button
        class="ml-auto"
        :class="{
          btn_close_clickable: isRevertableContent,
          btn_close_unclickable: !isRevertableContent,
        }"
        @click="handleRevert"
        type="button"
      >
        Revert
      </button>
      <button class="btn_save" type="submit">Save</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, watch, inject } from "vue";

import InputControl from "../../components/InputControl.vue";
import { useInputState } from "../../stores/inputState";
import { useAboutMe } from "../../stores/aboutMe";
import { uploadImage, successModal, errorModal } from "../../libs/utils";
import { setDocument } from "../../libs/firebase";

const swal = inject("$swal");

const aboutMeState = useAboutMe();
const inputState = useInputState();

const isRevertableContent = ref(false);
// const isRevertableSectionTitle = ref(false);
const currentFile = ref(null);
const isChangeImg = ref(false);

let currentAboutMe = ref({
  title: aboutMeState.title,
  imgLink: aboutMeState.imgLink,
  content: aboutMeState.content,
});

watch(
  currentAboutMe,
  (newVal, oldVal) => {
    if (newVal.content === aboutMeState.content) {
      isRevertableContent.value = false;
    } else {
      isRevertableContent.value = true;
    }

    // if (newVal.title === aboutMeState.title) {
    //   isRevertableSectionTitle.value = false;
    // } else {
    //   isRevertableSectionTitle.value = true;
    // }
  },
  {
    deep: true,
  }
);

const getImage = (file) => (currentFile.value = file);

// function handleEditSectionTitle() {
//   aboutMeState.$patch({
//     sectionTitle: currentAboutMe.value.sectionTitle,
//   });

//   isRevertableSectionTitle.value = false;
// }

// function handleRevertSectionTitle() {
//   currentAboutMe.value.sectionTitle = aboutMeState.sectionTitle;
// }

function handleRevert() {
  currentAboutMe.value.content = aboutMeState.content;

  inputState.quillEditor["aboutMeEdit"].el.innerHTML = aboutMeState.content;
}

async function editAboutme() {
  try {
    const url = await uploadImage({
      type: "aboutMe",
      currentLocalValue: aboutMeState.imgLink,
      file: currentFile.value,
    });

    await setDocument("aboutMe", "section", {
      ...currentAboutMe.value,
      imgLink: url,
    });

    aboutMeState.$patch({
      imgLink: url,
      content: currentAboutMe.value.content,
    });

    inputState.quillEditor["aboutMeEdit"].el.innerHTML = aboutMeState.content;
    isRevertableContent.value = false;

    currentAboutMe.value = { ...aboutMeState.getAll };

    successModal(swal, "Aboutme has been successfully edited!");
  } catch (error) {
    errorModal(swal, error);
  }
}
</script>

<style lang="scss" scoped></style>
