<template>
  <form @submit.prevent="handleSubmit('headline')">
    <InputControl identifier="Headline" v-model="currentEditedHeadline.headline"
      >Headline</InputControl
    >
    <InputControl
      identifier="headlineDescription"
      v-model="currentEditedHeadline.headlineDescription"
      input-height="h-[230px]"
      input-width="w-[680px]"
      input-type="textarea"
      >Headline Description</InputControl
    >
    <div class="flex mt-16 gap-2 self-end">
      <button type="submit" class="btn_close ml-auto" @click="revertHeadline">
        Revert
      </button>

      <button class="btn_save">Save</button>
    </div>
  </form>
  <div class="section_divider"></div>
  <div class="flex items-center gap-3">
    <div>
      <h1 class="font-bold text-xl mt-5 mb-2">
        History ({{ historyInput.posts.length }})
      </h1>
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
      v-for="(history, index) in historyInput.posts"
      :key="history.title"
      class="w-full p-4 rounded-lg border-2 mb-3 flex justify-between"
    >
      <div>
        <h1 class="text-xl font-semibold">{{ history.title }}</h1>
        <span class="text-sm">{{ history.event }}</span>
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

  <Teleport to="body">
    <!-- The idea here is to attach value based on which element we click on -->
    <div v-if="showModal">
      <vue-final-modal
        v-model="showModal"
        classes="flex justify-center items-center p-10"
        content-class="bg-white p-10 rounded-lg"
        :click-to-close="false"
      >
        <form @submit.prevent="handleSubmit('history')">
          <div class="flex items-center justify-between">
            <div class="mb-10">
              <h1 class="text-2xl mb-2">
                {{ isCreating ? "Create new History " : "Edit your History" }}
              </h1>
              <div class="heading_divider"></div>
            </div>
            <button @click="handleCancelAndClose" class="self-start">
              <Icon icon="material-symbols:close" width="30" height="30" />
            </button>
          </div>

          <!-- Handle edit  -->
          <div v-if="!isCreating">
            <InputControl
              identifier="imageEdit"
              v-model="currentEditedHistoryPost.imgLink"
              input-type="file"
              >Change Image</InputControl
            >
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
              >Tittle</InputControl
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
            <button type="submit" class="btn_close ml-auto" @click="handleCancelAndClose">
              Cancel
            </button>

            <button class="btn_save">Save</button>
          </div>
        </form>
      </vue-final-modal>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { VueFinalModal } from "vue-final-modal";

import InputControl from "../../components/InputControl.vue";

const historyInput = reactive({
  headline: "My Amazing History",
  headlineDescription: "wew",
  posts: [
    {
      imgLink: "temp",
      title: "National Aeronautics and Space Administration",
      event: "Software Engineer Tech Lead, Fall 2015 - May 2019",
      historyContent: "<h1>Hello</h1>",
    },
    {
      imgLink: "temp",
      title: "Facebook Gaming",
      event: "CEO, Fall 2015 - May 2019",
      historyContent: "<h1>Hello bro</h1>",
    },
  ],
});

const showModal = ref(false);

/* TODO: dont apply value when  form its no saving value (eg make copy object)  */

/* Track which post we chose to edit */
const currentIndexClicked = ref(null);

/* State for detecting if we want create a new History */
const isCreating = ref(false);
const newHistoryPost = reactive({
  imgLink: "",
  title: "",
  event: "",
  historyContent: "",
});
const currentEditedHistoryPost = ref(null);

watch(currentIndexClicked, (newVal, oldVal) => {
  currentEditedHistoryPost.value = { ...historyInput.posts[newVal] };
});

const currentEditedHeadline = reactive({
  headline: historyInput.headline,
  headlineDescription: historyInput.headlineDescription,
});

function handleSubmit(options /* history / headline */) {
  switch (options) {
    case "history": {
      if (isCreating.value) {
        // Creating new post
        historyInput.posts.push({ ...newHistoryPost });

        /* Reset */
        resetValue(newHistoryPost);

        /* Reset */
        isCreating.value = false;
        showModal.value = false;
      } else {
        // Edit
        if (currentIndexClicked.value !== null) {
          historyInput.posts[currentIndexClicked.value] = {
            ...currentEditedHistoryPost.value,
          };
        }
      }
      break;
    }
    case "headline": {
      historyInput.headline = currentEditedHeadline.headline;
      historyInput.headlineDescription = currentEditedHeadline.headlineDescription;
      break;
    }

    default:
    /* Do nothing */
  }
}

function handleCancelAndClose() {
  showModal.value = false;
  isCreating.value = false;
  resetValue(newHistoryPost);
}

/* TODO: Fix quil not reverted */
function revertHeadline() {
  console.log("beforce", {
    currentHeadline: currentEditedHeadline.headlineDescription,
    headline: historyInput.headlineDescription,
  });
  currentEditedHeadline.headline = historyInput.headline;
  currentEditedHeadline.headlineDescription = historyInput.headlineDescription;

  console.log("after", {
    currentHeadline: currentEditedHeadline.headlineDescription,
    headline: historyInput.headlineDescription,
  });
}

function resetValue(obj) {
  console.log("Before reset :", obj);

  /* only works with vue "reactive" */
  Object.keys(obj).forEach((key) => {
    obj[key] = "";
  });

  console.log("after reset : ", obj);
}
</script>

<style lang="scss" scoped></style>
