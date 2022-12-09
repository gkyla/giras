<template>
  <form @submit.prevent="handleSubmitHeadline">
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
      <button class="btn_close ml-auto" @click.self="revertHeadline" type="button">
        Revert
      </button>
      <button class="btn_save" type="submit">Save</button>
    </div>
  </form>

  <div class="section_divider"></div>
  <div class="flex items-center gap-3">
    <div>
      <h1 class="font-bold text-xl mt-5 mb-2">History ({{ history.posts.length }})</h1>
      <div class="heading_divider"></div>
    </div>

    <button class="btn_addNew group" @click="(showModal = true), (isCreating = true)">
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
      <div>
        <h1 class="text-xl font-semibold">{{ post.title }}</h1>
        <span class="text-sm">{{ post.event }}</span>
      </div>

      <div>
        <button
          class="rounded-lg inline-flex gap-2 items-center border-2 px-3 py-1"
          @click="(showModal = true), (currentIndexClicked = index)"
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
          <InputControl
            identifier="imageEdit"
            v-model="currentEditedHistoryPost.imgLink"
            input-type="file"
            >Change Image</InputControl
          >
          <InputControl identifier="HeadlineEdit" v-model="currentEditedHistoryPost.title"
            >Tittle</InputControl
          >
          <InputControl
            identifier="headlineDescriptionEdit"
            v-model="currentEditedHistoryPost.event"
            >Event Post</InputControl
          >
          <InputControl
            identifier="historyContentEdit"
            ref="quillEditor"
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
            >Tittle</InputControl
          >
          <InputControl identifier="addHeadling" v-model="newHistoryPost.title"
            >Tittle</InputControl
          >
          <InputControl identifier="AddHeadlineDescription" v-model="newHistoryPost.event"
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
          <button class="btn_close ml-auto" @click.stop="handleClose" type="button">
            Cancel
          </button>

          <button class="btn_save" type="submit">Save</button>
        </div>
      </form>
    </vue-final-modal>
  </div>
</template>

<script setup>
import { nextTick, reactive, ref, watch, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { VueFinalModal } from "vue-final-modal";
import InputControl from "../../components/InputControl.vue";
import { useHistoryTab } from "../../stores/historyTab";
import { useInputState } from "../../stores/inputState";

/* TODO: Add Delete history */
/* TODO: Work on headline section */
/* TODO : Add Revert functionality (Headline) */

const history = useHistoryTab();
const inputState = useInputState();

/* variable for tracking  */
const currentIndexClicked = ref(null);
const showModal = ref(false);
const isCreating = ref(false);

let newHistoryPost = reactive({
  imgLink: "",
  title: "",
  event: "",
  historyContent: "",
});
const currentEditedHistoryPost = ref(null);

watch(showModal, (newVal, oldVal) => {
  if (newVal) {
    if (!isCreating.value) {
      currentEditedHistoryPost.value = {
        ...history.posts[currentIndexClicked.value],
      };

      inputState.quillEditor.setHTML(
        history.posts[currentIndexClicked.value].historyContent
      );
    }
  }
});

const currentHeadline = reactive({
  headline: history.headline,
  headlineDescription: history.headlineDescription,
});

function handleSavePost() {
  if (!isCreating.value /* Edit */) {
    console.log("before saving edit :", currentEditedHistoryPost.value);

    history.$patch((state) => {
      state.posts[currentIndexClicked.value] = {
        ...currentEditedHistoryPost.value,
      };
    });
  } else {
    /* Creating new Posts */
    history.addPost({ ...newHistoryPost });
    console.log("before", newHistoryPost);

    console.log("after", newHistoryPost);

    newHistoryPost = reactive({ ...history._initialValue });
    inputState.quillEditor.setHTML(
      newHistoryPost.historyContent
    ); /* Then show blank quill */
    handleClose();
  }
}

function handleClose() {
  isCreating.value = false;
  showModal.value = false;
}
</script>

<style lang="scss" scoped></style>
