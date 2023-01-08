<template>
  <form @submit.prevent="handleSaveHeadline">
    <InputControl identifier="Headline" v-model="currentHeadline.headline"
      >Headline</InputControl
    >
    <InputControl
      identifier="headlineDescription"
      v-model="currentHeadline.headlineDescription"
      input-height="h-[230px]"
      input-width="w-[680px]"
      input-type="textarea"
      >Headline Description</InputControl
    >
    <div class="flex mt-16 gap-2 self-end">
      <button
        class="ml-auto"
        :class="{
          btn_close_clickable: isRevertable,
          btn_close_unclickable: !isRevertable,
        }"
        @click.self="handleRevertHeadline"
        type="button"
      >
        Revert
      </button>
      <button class="btn_save" type="submit">Save</button>
    </div>
  </form>

  <div class="section_divider"></div>
  <div class="flex items-center gap-3 my-5">
    <div>
      <h1 class="font-bold text-xl mb-2">
        History ({{ history.posts.length }})
      </h1>
      <div class="heading_divider"></div>
    </div>

    <button
      class="btn_addNew ml-auto group"
      @click="(showModal = true), (isCreating = true)"
    >
      <Icon
        icon="ic:baseline-plus"
        width="20"
        height="20"
        class="group-hover:text-[#85bc33] transition-all"
      />
      Add History
    </button>
  </div>
  <div id="works-container" class="py-4">
    <div
      v-for="(post, index) in history.posts"
      :key="post.title"
      class="w-full p-4 rounded-lg border-2 mb-3 flex justify-between"
    >
      <div class="flex gap-5 items-center">
        <img
          :src="post.imgLink"
          :alt="post.name"
          class="inline-block w-10 h-10 rounded-md"
        />
        <div>
          <h1 class="text-xl font-semibold">{{ post.title }}</h1>
          <span class="text-sm">{{ post.event }}</span>
        </div>
      </div>

      <div>
        <button
          class="rounded-lg inline-flex gap-2 items-center border-2 px-3 py-1"
          @click="editHistory(index)"
          type="button"
        >
          Edit <Icon icon="material-symbols:edit" />
        </button>
      </div>
    </div>
  </div>

  <!-- The idea here is to attach value based on which element we click on -->
  <div v-show="showModal">
    <vue-final-modal
      v-model="showModal"
      classes="flex justify-center items-center p-10"
      content-class="bg-white p-10 rounded-lg"
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
        <div v-if="!isCreating && currentEditedHistoryPost">
          <div v-if="isChangeImg" class="grid items-center gap-4 rounded">
            <div class="flex">
              <InputControl
                identifier="imageEdit"
                input-type="file"
                @inputedFile="getImage"
                >Image</InputControl
              >
            </div>
            <div class="flex gap-4 mb-5">
              <div class="flex items-center gap-6 w-36"></div>
              <img
                class="max-w-[100px] max-h-[100px] rounded-md"
                :src="currentEditedHistoryPost.imgLink"
                :alt="currentEditedHistoryPost.title"
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
                :src="currentEditedHistoryPost.imgLink"
                :alt="currentEditedHistoryPost.title"
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
            v-model="currentEditedHistoryPost.title"
            >Tittle</InputControl
          >
          <InputControl
            identifier="headlineDescriptionEdit"
            v-model="currentEditedHistoryPost.event"
            >Event Post</InputControl
          >
          <InputControl
            identifier="historyContentEdit"
            v-model="currentEditedHistoryPost.historyContent"
            inputHeight="h-[200px]"
            input-type="textarea"
            >History</InputControl
          >
        </div>

        <!-- Handle new -->
        <div v-else>
          <InputControl
            identifier="addImage"
            v-model="newHistoryPost.imgLink"
            input-type="file"
            @inputedFile="getImage"
            >Image</InputControl
          >
          <InputControl identifier="addHeadling" v-model="newHistoryPost.title"
            >Tittle</InputControl
          >
          <InputControl
            identifier="AddHeadlineDescription"
            v-model="newHistoryPost.event"
            >Event Post</InputControl
          >
          <InputControl
            identifier="AddHistoryContent"
            v-model="newHistoryPost.historyContent"
            inputHeight="h-[200px]"
            input-type="textarea"
            >History Content</InputControl
          >
        </div>

        <div class="flex mt-20 gap-2 self-end">
          <button
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
    </vue-final-modal>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { VueFinalModal } from "vue-final-modal";
import InputControl from "../../components/InputControl.vue";
import { useHistoryTab } from "../../stores/historyTab";
import { useInputState } from "../../stores/inputState";
import {
  uploadFile,
  createStorageRef,
  addDocument,
  setDocument,
  deleteDocument,
  deleteImageStorage,
} from "../../libs/firebase";

// TODO: force element to display fetchend data for the firsttime (looks like its not updating)

const history = useHistoryTab();
const inputState = useInputState();

/* variable for tracking  */
const currentIndexClicked = ref(null);
const currentFile = ref(null);
const showModal = ref(false);
const isCreating = ref(false);
const isRevertable = ref(false);
const isChangeImg = ref(false);

let newHistoryPost = reactive({
  imgLink: "",
  title: "",
  event: "",
  historyContent: "",
});
const currentEditedHistoryPost = ref(null);

watch(showModal, (newVal, oldVal) => {
  if (newVal) {
    console.log("showModal", newVal);
    if (!isCreating.value) {
      currentEditedHistoryPost.value = {
        ...history.posts[currentIndexClicked.value],
      };

      if (
        currentIndexClicked.value >= 0 &&
        inputState.quillEditor["historyContentEdit"]
      ) {
        inputState.quillEditor["historyContentEdit"].el.innerHTML =
          history.posts[currentIndexClicked.value].historyContent;
      }

      // Reset image changer state
      isChangeImg.value = false;
    }
  }
});

const currentHeadline = reactive({
  headline: history.headline,
  headlineDescription: history.headlineDescription,
});

watch(currentHeadline, (newVal, oldVal) => {
  if (newVal.headlineDescription !== history.headlineDescription) {
    isRevertable.value = true;
  } else {
    isRevertable.value = false;
  }
});

const headlineOldValue = ref({ ...currentHeadline });

function handleSaveHeadline() {
  headlineOldValue.value = { ...currentHeadline };

  history.$patch({
    headline: currentHeadline.headline,
    headlineDescription: currentHeadline.headlineDescription,
  });

  currentHeadline.headline = history.headline;
  currentHeadline.headlineDescription = history.headlineDescription;
}

function getImage(file) {
  currentFile.value = file;
}

async function uploadImage() {
  const ref = createStorageRef("history-posts");
  const hasImageBefore = !!currentEditedHistoryPost.value?.imgLink;
  console.log(currentFile.value);

  if (hasImageBefore) {
    // If has image remove first then upload the new one
    if (currentFile.value) {
      await deleteImageStorage(currentEditedHistoryPost.value?.imgLink);
      console.log("deleted first");
      const url = await uploadFile(ref, currentFile.value);
      currentFile.value = null;
      console.log("user mengupdate gambar nya");
      return url;
    } else {
      console.log("return gambar yang sudah ada");
      return currentEditedHistoryPost.value.imgLink;
    }
  } else {
    if (currentFile.value) {
      const url = await uploadFile(ref, currentFile.value);
      currentFile.value = null;
      console.log("user mengupload file gambar pertama kali");
      return url;
    } else {
      console.log("user tidak memasukan file apapun");
      return null;
    }
  }
}

function handleRevertHeadline() {
  currentHeadline.headline = headlineOldValue.value?.headline;
  currentHeadline.headlineDescription =
    headlineOldValue.value?.headlineDescription;

  inputState.quillEditor["headlineDescription"].el.innerHTML =
    currentHeadline.headlineDescription;

  console.log("kerevert dek");
}
async function handleDeletePost() {
  console.log("kedelet juga kah manis");
  const id = currentEditedHistoryPost.value.id;
  await deleteDocument("history-posts", id);
  history.$patch((state) => {
    const index = state.posts.findIndex((post) => post.id === id);

    state.posts.splice(index, 1);
  });
  await deleteImageStorage(currentEditedHistoryPost.value.imgLink);

  handleClose();
}

async function handleSavePost() {
  console.log("kesave dek");
  if (!isCreating.value /* Edit */) {
    const postId = history.posts[currentIndexClicked.value].id;

    const imgUrl = await uploadImage();
    console.log("ini lord url nya", imgUrl);
    await setDocument("history-posts", postId, {
      ...currentEditedHistoryPost.value,
      imgLink: imgUrl,
    });
    console.log("saved to database");
    history.$patch((state) => {
      state.posts[currentIndexClicked.value] = {
        ...currentEditedHistoryPost.value,
        imgLink: imgUrl,
      };
    });

    // Immediately update local Value
    currentEditedHistoryPost.value = history.posts[currentIndexClicked.value];
  } else {
    /* Creating new Posts */
    const imgUrl = await uploadImage();
    const doc = await addDocument("history-posts", {
      ...newHistoryPost,
      imgLink: imgUrl,
    });
    history.addPost({ ...newHistoryPost, id: doc.id, imgLink: imgUrl });

    newHistoryPost = reactive({ ...history._initialValuePost });
    inputState.quillEditor["AddHistoryContent"].el.innerHTML =
      newHistoryPost.historyContent;

    /* Then show blank quill */
    handleClose();
  }
}

function editHistory(index) {
  console.log("clicked", index);
  currentIndexClicked.value = index;
  showModal.value = true;
}

function handleClose() {
  isCreating.value = false;
  showModal.value = false;
}
</script>

<style lang="scss" scoped></style>
