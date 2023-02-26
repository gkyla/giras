<template>
  <div
    id="home"
    class="w-full lg:py-28 py-10 px-4 flex justify-center items-center relative z-[3] mt-14 bg-[#f4f7fb]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
      <div class="rounded-xl">
        <img
          id="0-navHeader"
          :src="homeState.imgLink"
          class="max-w-full w-[500px] h-[400px] brightness-[.75] bg-cover object-cover pointer-events-none rounded-xl"
        />
      </div>
      <div
        class="font-bold text-4xl text-slate-700 text-left z-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div class="flex flex-col gap-2">
          <p>Hello</p>
          <p class="text-lg">I am</p>
          <p>Giras Gendrasena</p>
          <button
            class="rounded-full mt-4 px-4 py-1 bg-[#72a02c] transition-colors duration-500 hover:brightness-110 text-lg text-slate-50 self-start"
            @click="$router.push('#history')"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            Explore
          </button>
        </div>
        <div class="mt-10 flex gap-5">
          <a
            :href="socialsState.facebook"
            class="hover:text-[#72a02c] transition-all"
            target="_blank"
          >
            <Icon icon="ph:facebook-logo" width="50" height="50"></Icon>
          </a>

          <a
            :href="socialsState.instagram"
            class="hover:text-[#72a02c] transition-all"
            target="_blank"
          >
            <Icon icon="basil:instagram-outline" width="50" height="50"></Icon>
          </a>

          <a
            :href="socialsState.linkedin"
            class="hover:text-[#72a02c] transition-all"
            target="_blank"
          >
            <Icon icon="iconoir:linkedin" width="50" height="50"></Icon>
          </a>

          <a
            :href="socialsState.twitter"
            class="hover:text-[#72a02c] transition-all"
            target="_blank"
          >
            <Icon icon="basil:twitter-outline" width="50" height="50"></Icon>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  socialsState: Object,
  homeState: Object,
});
</script>

<style scoped></style>
