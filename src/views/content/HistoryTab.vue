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
  <div class="border border-slate-200 w-full"></div>
  <div class="flex items-center gap-3">
    <div>
      <h1 class="font-bold text-xl mt-5 mb-2">
        History ({{ historyInput.historyPost.length }})
      </h1>
      <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
    </div>

    <button
      class="self-center ml-auto mt-5 border-2 border-slate-500 hover:border-[#85bc33] group px-5 py-2 rounded-full text-sm flex items-center gap-2 transition-all hover:font-semibold"
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
</template>

<script setup>
import { reactive } from "vue";
import { Icon } from "@iconify/vue";

import InputControl from "../../components/InputControl.vue";

const historyInput = reactive({
  headline: "My Amazing History",
  headlineDescription:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore maiores, harum corporis minus nihil iusto eligendi distinctio. Obcaecati accusamus deleniti, quisquam in dolorum recusandae delectus iusto fugiat illo id saepe voluptatem ut consectetur sequi facere! Reiciendis assumenda consequatur cum nulla.",
  historyPost: [
    {
      imgLink: "temp",
      title: "National Aeronautics and Space Administration",
      eventPost: "Software Engineer Tech Lead, Fall 2015 - May 2019",
      markdown: "TODO: FIND MARKDOWN LIBS",
    },
    {
      imgLink: "temp",
      title: "Facebook Gaming",
      eventPost: "CEO, Fall 2015 - May 2019",
      markdown: "TODO: FIND MARKDOWN LIBS",
    },
  ],
});
</script>

<style lang="scss" scoped></style>
