<template>
  <InputControl identifier="Headline" v-model="currentMyWorks.title" label-width="w-48"
    >Change section tittle</InputControl
  >
  <div class="border border-slate-200 w-full"></div>

  <div class="flex items-center gap-3">
    <div>
      <h1 class="font-bold text-xl mt-5 mb-2">
        My works ({{ currentMyWorks.posts.length }})
      </h1>
      <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
    </div>

    <button
      class="self-center ml-auto mt-5 border-2 border-slate-500 hover:border-[#85bc33] group px-5 py-2 rounded-full text-sm flex items-center gap-2 transition-all hover:font-semibold"
      @click="handleCreating"
    >
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
    <div
      v-for="(post, index) in currentMyWorks.posts"
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
          <span class="text-sm">{{ dateFormat(post.date) }}</span>
        </div>
      </div>

      <div>
        <button
          class="rounded-lg inline-flex gap-2 items-center border-2 px-3 py-1"
          @click="editPosts(index)"
          type="button"
        >
          Edit <Icon icon="material-symbols:edit" />
        </button>
      </div>
    </div>
  </div>

  <div v-show="showModal">
    <VueFinalModal
      v-model="showModal"
      classes="flex justify-center items-center p-10"
      content-class="bg-white p-10 rounded-lg"
      :click-to-close="false"
    >
      <form @submit.prevent="handleSave">
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
          <InputControl
            identifier="imageEdit"
            v-model="currentEditedWorkPost.imgLink"
            input-type="file"
            >Change Image</InputControl
          >
          <InputControl identifier="HeadlineEdit" v-model="currentEditedWorkPost.title"
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
            >Tittle</InputControl
          >
          <InputControl identifier="addHeadling" v-model="newWorkPost.title"
            >Tittle</InputControl
          >
          <InputControl identifier="dateNew" inputType="date" v-model="newWorkPost.date"
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
          <button class="btn_close ml-auto" @click.stop="handleClose" type="button">
            Cancel
          </button>

          <button class="btn_save" type="submit">Save</button>
        </div>
      </form>
    </VueFinalModal>
  </div>
</template>

<script setup>
/* TODO: make this done */

import { reactive, ref, watch, computed } from "vue";
import { Icon } from "@iconify/vue";
import { VueFinalModal } from "vue-final-modal";
import InputControl from "../../components/InputControl.vue";
import { useMyWorks } from "../../stores/myWorksTab";

const myWorksState = useMyWorks();

const currentMyWorks = reactive({
  title: myWorksState.title,
  posts: myWorksState.posts,
});
const newWorkPost = reactive({
  imgLink: null,
  title: "",
  date: new Date(),
  content: "",
});
const currentEditedWorkPost = ref(null);
const currentIndexClicked = ref(null);
const showModal = ref(false);
const isCreating = ref(false);

function dateFormat(postDate) {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const temp = new Intl.DateTimeFormat("en-US", options).format(postDate).split(" ");
  temp[2] = temp[2].replace(",", " ");
  return temp.join(" ");
}

watch(showModal, (newVal, oldVal) => {
  if (newVal) {
    if (currentIndexClicked.value >= 0) {
      console.log("edited");
      /* edit */
      currentEditedWorkPost.value = {
        ...myWorksState.posts[currentIndexClicked.value],
      };

      /* TODO: update datepicker element value on every different currentEditedWorkPost value */
      console.log(currentEditedWorkPost.value);
    }
  }
});

function editPosts(i) {
  console.log("editPOst");
  currentIndexClicked.value = i;
  showModal.value = true;
}

function handleCreating() {
  console.log("handle creating");
  showModal.value = true;
  isCreating.value = true;
}

function handleClose() {
  showModal.value = false;
  isCreating.value = false;
}
</script>

<style lang="scss" scoped></style>
