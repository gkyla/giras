<template>
  <div
    id="myworks"
    class="container mx-auto max-w-screen-xl flex flex-col items-center justify-center my-20 px-2"
  >
    <div class="flex flex-col gap-4 items-center justify-center mb-10">
      <h1
        class="text-4xl font-semibold text-slate-700 px-5 py-2 self-start"
        id="3-navHeader"
      >
        Experience
      </h1>
      <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
    </div>
    <div
      id="worksbox"
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-7"
    >
      <MiniCard
        v-for="work in myWorksState.posts"
        :title="work.title"
        :date="dateFormat(work.date)"
        :img="work.imgLink"
        :position="work.position"
        data-aos="zoom-in-up"
        data-aos-duration="800"
      >
        <div
          v-dompurify-html="work.content"
          class="prose prose-content-spacing"
        ></div>
      </MiniCard>
    </div>
  </div>
</template>

<script setup>
import MiniCard from "../MiniCard.vue";
import { dateFormat } from "../../libs/utils";

const props = defineProps({
  myWorksState: Object,
});
</script>

<style scoped></style>
