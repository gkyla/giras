<template>
  <div class="flex items-center gap-3 my-5">
    <div>
      <h1 class="font-bold text-xl mb-2">
        My works ({{ currentMyWorks.posts.length }})
      </h1>
      <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
    </div>

    <button class="btn_addNew ml-auto" @click="handleCreating">
      <Icon
        icon="ic:baseline-plus"
        width="20"
        height="20"
        class="group-hover:text-[#85bc33] transition-all"
      />
      Add Works
    </button>
  </div>
  <div id="works-container" class="py-4">
    <div v-if="currentMyWorks.posts.length > 0">
      <div
        v-for="(post, index) in currentMyWorks.posts"
        :key="post.title"
        class="w-full p-4 rounded-lg border-2 mb-3 flex flex-col sm:flex-row justify-between"
      >
        <div class="flex flex-col sm:flex-row gap-5 items-center">
          <img
            :src="post.imgLink"
            :alt="post.name"
            class="inline-block w-16 h-16 sm:w-10 sm:h-10 object-cover rounded-md"
          />
          <div class="text-center sm:text-left">
            <h1 class="lg:text-xl font-semibold">{{ post.title }}</h1>
            <span class="text-sm">{{ dateFormat(post.date) }}</span>
          </div>
        </div>

        <div class="mx-auto mt-4 sm:mt-[unset] sm:mx-[unset]">
          <button
            class="rounded-lg inline-flex gap-2 items-center border-2 px-3 py-1"
            @click="handleEditPost(index)"
            type="button"
          >
            Edit <Icon icon="material-symbols:edit" />
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="mt-10 text-2xl text-center">No works post has been created</h1>
    </div>
  </div>

  <div v-if="showModal">
    <VueFinalModal
      v-model="showModal"
      classes="flex justify-center items-center "
      content-class="bg-white p-2 w-full h-full md:p-10 md:w-auto md:h-auto rounded-lg"
      :click-to-close="false"
    >
      <form @submit.prevent="handleSavePost">
        <div class="flex items-center justify-between">
          <div class="mb-10">
            <h1 class="text-2xl mb-2">
              {{ isCreating ? "Create new History " : "Edit your History" }}
            </h1>
            <div class="heading_divider"></div>
          </div>
          <button @click.stop="handleClose" type="button" class="self-start">
            <Icon icon="material-symbols:close" width="30" height="30" />
          </button>
        </div>

        <!-- Handle edit  -->
        <div v-if="!isCreating && currentEditedWorkPost">
          <div v-if="isChangeImg" class="grid items-center gap-4 rounded">
            <div class="flex">
              <InputControl
                identifier="imageEditHistory"
                input-type="file"
                @inputedFile="getImage"
                >Image</InputControl
              >
            </div>
            <div class="flex gap-4 mb-5">
              <div class="flex items-center gap-6 w-36"></div>
              <img
                class="max-w-[100px] max-h-[100px] rounded-md"
                :src="currentEditedWorkPost?.imgLink"
                :alt="currentEditedWorkPost?.title"
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
                :src="currentEditedWorkPost?.imgLink"
                :alt="currentEditedWorkPost?.title"
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
            identifier="HeadlineEdit"
            v-model="currentEditedWorkPost.title"
            >Tittle</InputControl
          >
          <InputControl
            identifier="dateEdit"
            inputType="date"
            v-model="currentEditedWorkPost.date"
            >Event Post</InputControl
          >
          <InputControl
            identifier="WorkContentEdit"
            v-model="currentEditedWorkPost.content"
            inputHeight="h-[200px]"
            input-type="textarea"
            >History</InputControl
          >
        </div>

        <!-- Handle new -->
        <div v-else>
          <InputControl
            identifier="addImage"
            v-model="newWorkPost.imgLink"
            input-type="file"
            @inputedFile="getImage"
            >Image</InputControl
          >
          <InputControl identifier="addHeadling" v-model="newWorkPost.title"
            >Tittle</InputControl
          >
          <InputControl
            identifier="dateNew"
            inputType="date"
            v-model="newWorkPost.date"
            >Date</InputControl
          >
          <InputControl
            identifier="AddWorks"
            v-model="newWorkPost.content"
            inputHeight="h-[200px]"
            input-type="textarea"
            >History Content</InputControl
          >
        </div>

        <div class="flex mt-20 gap-2 self-end">
          <button
            v-if="!isCreating"
            class="btn_close bg-red-700 flex items-center"
            type="button"
            @click="handleDeletePost"
          >
            Delete Post
            <Icon
              icon="mdi:trash-can-outline"
              width="25"
              height="25"
              class="ml-2"
            />
          </button>

          <button
            class="btn_close ml-auto"
            @click.stop="handleClose"
            type="button"
          >
            Cancel
          </button>

          <button class="btn_save" type="submit">Save</button>
        </div>
      </form>
    </VueFinalModal>
  </div>
</template>

<script setup>
import { reactive, ref, watch, inject } from "vue";
import { Icon } from "@iconify/vue";
import { VueFinalModal } from "vue-final-modal";
import InputControl from "../../components/InputControl.vue";
import { useMyWorks } from "../../stores/myWorksTab";
import { useInputState } from "../../stores/inputState";
import {
  addDocument,
  setDocument,
  deleteDocument,
  deleteImageStorage,
} from "../../libs/firebase";
import {
  uploadImage,
  dateFormat,
  successModal,
  errorModal,
} from "../../libs/utils";

const myWorksState = useMyWorks();
const inputState = useInputState();
const swal = inject("$swal");

const currentMyWorks = reactive({
  sectionTitle: myWorksState.sectionTitle,
  posts: myWorksState.posts,
});
let newWorkPost = reactive({
  imgLink: null,
  title: "",
  date: new Date(),
  content: "",
});
const currentEditedWorkPost = ref(null);
const currentIndexClicked = ref(null);
const showModal = ref(false);
const isCreating = ref(false);
const isRevertable = ref(false);
const isChangeImg = ref(false);
const currentFile = ref(null);

watch(showModal, (newVal, oldVal) => {
  if (newVal) {
    if (currentIndexClicked.value >= 0) {
      /* edit */
      currentEditedWorkPost.value = {
        ...myWorksState.posts[currentIndexClicked.value],
      };
    }
  }
});

watch(currentMyWorks, (newVal, oldVal) => {
  if (newVal.sectionTitle === myWorksState.sectionTitle) {
    isRevertable.value = false;
  } else {
    isRevertable.value = true;
  }
});

function getImage(file) {
  currentFile.value = file;
}

// function handleEditSectionTitle() {
//   myWorksState.$patch({
//     sectionTitle: currentMyWorks.sectionTitle,
//   });

//   isRevertable.value = false;
// }

// function handleRevertSectionTitle() {
//   currentMyWorks.sectionTitle = myWorksState.sectionTitle;
// }

async function handleSavePost() {
  try {
    if (!isCreating.value) {
      /* Edit */
      const postId = currentEditedWorkPost.value.id;

      const url = await uploadImage({
        type: "works",
        currentLocalValue: currentEditedWorkPost.value.imgLink,
        file: currentFile.value,
      });

      console.log("id : ", postId);
      await setDocument("works", postId, {
        ...currentEditedWorkPost.value,
        imgLink: url,
      });

      myWorksState.$patch((state) => {
        state.posts[currentIndexClicked.value] = {
          ...currentEditedWorkPost.value,
          imgLink: url,
        };
      });

      successModal(swal, "Work post successfully edited !");
    } else {
      /* New post */
      const url = await uploadImage({
        type: "works",
        currentLocalValue: newWorkPost.imgLink,
        file: currentFile.value,
      });
      console.log("url", url);

      // console.log("id : ", postId);
      const doc = await addDocument("works", {
        ...newWorkPost,
        imgLink: url,
      });

      myWorksState.$patch((state) => {
        state.posts.push({
          ...newWorkPost,
          id: doc.id,
          imgLink: url,
        });
      });

      // Reset newWorkPost
      newWorkPost = reactive({ ...myWorksState._initialValuePost });
      currentFile.value = null;
      inputState.quillEditor["AddWorks"].el.innerHTML = newWorkPost.content;

      successModal(swal, "Work post has been successfully created !");
      handleClose();
    }
  } catch (error) {
    errorModal(swal, error);
  }
}

async function handleDeletePost() {
  try {
    const id = currentEditedWorkPost.value.id;
    await deleteDocument("works", id);
    myWorksState.$patch((state) => {
      const index = state.posts.findIndex((post) => post.id === id);

      state.posts.splice(index, 1);
    });
    await deleteImageStorage(currentEditedWorkPost.value.imgLink);

    successModal(swal, "Work post has been successfully deleted !");
    handleClose();
  } catch (error) {
    errorModal(swal, error);
  }
}

function handleEditPost(i) {
  currentIndexClicked.value = i;
  showModal.value = true;
}

function handleCreating() {
  showModal.value = true;
  isCreating.value = true;
}

function handleClose() {
  showModal.value = false;
  isCreating.value = false;
}
</script>

<style lang="scss" scoped></style>
