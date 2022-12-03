<template>
  <InputControl identifier="Headline" v-model="historyInput.headline"
    >Headline</InputControl
  >
  <InputControl
    identifier="headlineDescription"
    v-model="historyInput.headlineDescription"
    input-type="textarea"
    >Headline Description</InputControl
  >
  <div class="border border-slate-200 w-full mt-16"></div>
  <div class="flex items-center gap-3">
    <div>
      <h1 class="font-bold text-xl mt-5 mb-2">
        History ({{ historyInput.historyPosts.length }})
      </h1>
      <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
    </div>

    <button
      class="self-center ml-auto mt-5 border-2 border-slate-500 hover:border-[#85bc33] group px-5 py-2 rounded-full text-sm flex items-center gap-2 transition-all hover:font-semibold"
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
      v-for="(history, index) in historyInput.historyPosts"
      :key="history.title"
      class="w-full p-4 rounded-lg border-2 mb-3 flex justify-between"
    >
      <div>
        <h1 class="text-xl font-semibold">{{ history.title }}</h1>
        <span class="text-sm">{{ history.eventPost }}</span>
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
        <form @submit.prevent="handleSubmit">
          <div class="flex items-center justify-between">
            <div class="mb-10">
              <h1 class="text-2xl mb-2">
                {{ isCreating ? "Create new History " : "Edit your History" }}
              </h1>
              <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
            </div>
            <button @click="handleCancelAndClose" class="self-start">
              <Icon icon="material-symbols:close" width="30" height="30" />
            </button>
          </div>

          <!-- Handle edit  -->
          <div v-if="!isCreating">
            <InputControl
              identifier="HeadlineEdit"
              v-model="historyInput.historyPosts[currentIndexClicked].title"
              >Tittle</InputControl
            >
            <InputControl
              identifier="headlineDescriptionEdit"
              v-model="historyInput.historyPosts[currentIndexClicked].eventPost"
              >Event Post</InputControl
            >
            <InputControl
              identifier="historyContentEdit"
              v-model="historyInput.historyPosts[currentIndexClicked].historyContent"
              input-type="textarea"
              >Event Post</InputControl
            >
          </div>

          <!-- Handle new -->
          <div v-else>
            <InputControl identifier="HeadlineEdit" v-model="newHistoryPost.title"
              >Tittle</InputControl
            >
            <InputControl
              identifier="headlineDescriptionEdit"
              v-model="newHistoryPost.eventPost"
              >Event Post</InputControl
            >
            <InputControl
              identifier="historyContentEdit"
              v-model="newHistoryPost.historyContent"
              input-type="textarea"
              >History Content</InputControl
            >
          </div>

          <div class="flex mt-20 gap-2 self-end">
            <button
              type="submit"
              class="ml-auto px-4 py-2 rounded-xl bg-red-800 font-semibold text-white shadow border-2 hover:brightness-110 transition-all"
              @click="handleCancelAndClose"
            >
              cancel
            </button>

            <button
              class="px-4 py-2 rounded-xl bg-[#85bc33] font-semibold text-white shadow border-2 hover:brightness-110 transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </vue-final-modal>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Icon } from "@iconify/vue";
import { VueFinalModal } from "vue-final-modal";

import InputControl from "../../components/InputControl.vue";

const showModal = ref(false);

/* TODO: dont apply value when  form its no saving value (eg make copy object)  */

/* Track which post we chose to edit */
const currentIndexClicked = ref(null);

/* State for detecting if we want create a new History */
const isCreating = ref(false);
const newHistoryPost = reactive({
  imgLink: "",
  title: "",
  eventPost: "",
  historyContent: "",
});

function handleSubmit() {
  if (isCreating.value) {
    historyInput.historyPosts.push({ ...newHistoryPost });

    /* Reset */
    resetValue(newHistoryPost);

    /* Reset */
    isCreating.value = false;
    showModal.value = false;
  }
}

function handleCancelAndClose() {
  showModal.value = false;
  isCreating.value = false;
  resetValue(newHistoryPost);
}

function resetValue(obj) {
  console.log("Before reset :", obj);

  /* only works with vue "reactive" */
  Object.keys(obj).forEach((key) => {
    obj[key] = "";
  });

  console.log("after reset : ", obj);
}

const historyInput = reactive({
  headline: "My Amazing History",
  headlineDescription:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore maiores, harum corporis minus nihil iusto eligendi distinctio. Obcaecati accusamus deleniti, quisquam in dolorum recusandae delectus iusto fugiat illo id saepe voluptatem ut consectetur sequi facere! Reiciendis assumenda consequatur cum nulla.",
  historyPosts: [
    {
      imgLink: "temp",
      title: "National Aeronautics and Space Administration",
      eventPost: "Software Engineer Tech Lead, Fall 2015 - May 2019",
      historyContent: "TODO: FIND MARKDOWN LIBS",
    },
    {
      imgLink: "temp",
      title: "Facebook Gaming",
      eventPost: "CEO, Fall 2015 - May 2019",
      historyContent: "TODO: FIND MARKDOWN LIBS",
    },
  ],
});
</script>

<style lang="scss" scoped></style>
