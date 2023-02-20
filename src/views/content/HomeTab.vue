<template>
  <form @submit.prevent="editHome">
    <div v-if="isChangeImg" class="grid items-center gap-4 rounded">
      <div class="flex">
        <InputControl identifier="homeimg" input-type="file" @inputedFile="getImage"
          >Image</InputControl
        >
      </div>
      <div class="flex gap-4 mb-5">
        <div class="md:flex items-center gap-6 w-36 hidden"></div>
        <img
          class="max-w-[100px] max-h-[100px] rounded-md"
          :src="currentHomeState?.imgLink"
          alt="Home display image"
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
    <div class="flex flex-col sm:flex-row gap-4 mb-5" v-show="!isChangeImg">
      <div class="flex items-center gap-6 w-36">
        <span class="font-bold">Image :</span>
      </div>
      <div class="flex">
        <img
          class="max-w-[100px] max-h-[100px] rounded-md"
          :src="currentHomeState?.imgLink"
          alt="Home display image"
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

    <InputControl identifier="title1" v-model="currentHomeState.lineOne"
      >Tittle Line 1</InputControl
    >
    <InputControl identifier="title2" v-model="currentHomeState.lineTwo"
      >Tittle Line 2</InputControl
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
import { watch, ref, inject } from "vue";

import InputControl from "../../components/InputControl.vue";
import { useHome } from "../../stores/homeTab";
import { addDocument, createStorageRef, setDocument } from "../../libs/firebase/index";
import { uploadImage as upload, successModal, errorModal } from "../../libs/utils";

const swal = inject("$swal");

const isRevertable = ref(false);
const homeState = useHome();
const currentFile = ref(null);
const isChangeImg = ref(null);

const currentHomeState = ref({
  lineOne: homeState.lineOne,
  lineTwo: homeState.lineTwo,
  imgLink: homeState.imgLink,
  id: homeState.id,
});

function compareableHomeState() {
  return {
    lineOne: homeState.lineOne,
    lineTwo: homeState.lineTwo,
    imgLink: homeState.imgLink,
    id: homeState.id,
  };
}

function getImage(file) {
  currentFile.value = file;
}

watch(
  currentHomeState,
  (newVal, oldVal) => {
    if (JSON.stringify(newVal) === JSON.stringify(compareableHomeState())) {
      isRevertable.value = false;
    } else {
      isRevertable.value = true;
    }
  },
  { deep: true }
);

async function uploadImg() {
  try {
    const url = await upload({
      type: "home",
      currentLocalValue: currentHomeState.value.imgLink,
      file: currentFile.value,
    });

    return url;
  } catch (error) {
    errorModal(swal, error);
  }
}

function handleRevert() {
  currentHomeState.value = homeState.revert({ ...currentHomeState.value });
}

async function editHome() {
  try {
    const url = await uploadImg();
    console.log(url);

    await setDocument("home", homeState.id, {
      ...currentHomeState.value,
      imgLink: url,
    });

    homeState.edit({ ...currentHomeState.value, imgLink: url });
    currentHomeState.value.imgLink = url;
    isRevertable.value = false;
    successModal(swal, "Section has been successfully edited !");
  } catch (error) {
    errorModal(swal, error);
  }
}
</script>

<style lang="scss" scoped></style>
