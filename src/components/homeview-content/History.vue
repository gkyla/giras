<template>
  <div id="history" class="bg-slate-50 py-12">
    <div
      class="container mx-auto max-w-screen-xl sm:mb-16 md:mb-20 flex justify-center flex-col px-2"
      id="1-navHeader"
    >
      <div class="flex gap-4 items-center justify-center text-center">
        <div
          id="bullet1"
          class="w-[15px] h-[15px] rounded-full bg-[#85bc33] pointer-events-none"
        ></div>
        <h1 class="text-4xl font-semibold text-slate-600">
          {{ historyTabState.headline }}
        </h1>
        <div
          id="bullet1"
          class="w-[15px] h-[15px] rounded-full bg-[#85bc33] pointer-events-none"
        ></div>
      </div>
      <p
        class="mt-10 mx-auto text-center max-w-screen-lg md:text-lg"
        v-dompurify-html="historyTabState.headlineDescription"
      >
        <!-- <span ></span> -->
      </p>

      <div
        id="downarrow"
        class="mx-auto mt-[2rem] text-[#85bc33] p-2 bg-white rounded-full border-2 hover:shadow-md cursor-pointer transition-all"
        @click="$router.push('#firstHistory')"
      >
        <Icon icon="material-symbols:arrow-downward" width="60" height="60" />
      </div>
    </div>

    <!-- History card -->
    <div class="container mx-auto max-w-screen-xl mb-32 px-2">
      <div
        class="grid lg:grid-cols-3 grid-rows-2 md:grid-rows-none place-items-end md:place-items-center lg:place-items-start md:mt-40 -mt-10 px-3"
        data-aos="fade-up"
        data-aos-duration="1300"
        v-for="(post, index) in historyTabState.posts"
        :key="post.title"
      >
        <div class="relative col-span-2 lg:col-span-1 mx-auto">
          <img
            src="../../assets/img/polkadot.png"
            alt="polkadot pattern"
            class="w-[200px] h-[200px] absolute -hue-rotate-60 -top-16 -left-16"
          />
          <img
            :src="post.imgLink"
            :alt="post.title"
            class="w-[430px] h-full relative z-10"
          />
        </div>
        <div
          class="lg:px-10 lg:ml-7 px-3 col-span-2 prose prose-lg self-start"
          :id="index === 0 ? 'firstHistory' : ''"
        >
          <h1
            class="font-bold text-2xl bg-[#85bc33] text-white inline-block px-2 py-2 shadow-lg mt-10 lg:mt-0"
          >
            {{ post.title }}
          </h1>
          <span class="text-[#85bc33] mb-7 block">{{ post.event }}</span>
          <div
            v-dompurify-html="post.historyContent"
            class="prose-content-spacing"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  historyTabState: Object,
});
</script>

<style scoped></style>
