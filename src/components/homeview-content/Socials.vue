<template>
  <div
    id="socials"
    ref="socialsElement"
    class="flex flex-col bg-slate-50 items-center justify-center relative min-h-[550px]"
  >
    <div class="p-10 z-20">
      <div
        class="flex container w-full mx-auto max-w-screen-xl flex-col gap-4 items-center justify-center mb-10 text-center px-2"
      >
        <div class="flex flex-col items-center gap-3">
          <h1
            class="text-4xl font-semibold text-slate-700 px-5 py-2 self-start"
            id="4-navHeader"
          >
            Socials
          </h1>
          <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
        </div>
        <p class="text-slate-700 max-w-screen-lg">
          Got a question, proposal, project or want to work together on
          something? Feel free to reach out to one of my socials!
        </p>
      </div>
      <div class="container mx-auto max-w-screen-lg mb-20 px-2 relative">
        <div
          id="socialsbox"
          class="gap-5 grid md:grid-cols-2 lg:grid-cols-4 relative"
        >
          <SocialCard
            name="Facebook"
            :iconify="{
              icon: 'iconoir:facebook',
              width: '100',
              height: '100',
            }"
            :link="socialsState.facebook"
            background-on-hover="hover:bg-[#4267B2]"
          />
          <!-- Use independent style (#instagram-social) -->
          <SocialCard
            id="instagram-social"
            name="Instagram"
            :iconify="{
              icon: 'ph:instagram-logo-light',
              width: '100',
              height: '100',
            }"
            :link="socialsState.instagram"
          />
          <SocialCard
            name="Linkedin"
            :iconify="{
              icon: 'uit:linkedin-alt',
              width: '100',
              height: '100',
            }"
            :link="socialsState.linkedin"
            background-on-hover="hover:bg-[#0077b5]"
          />
          <SocialCard
            name="Twitter"
            :iconify="{
              icon: 'uit:twitter-alt',
              width: '100',
              height: '100',
            }"
            :link="socialsState.twitter"
            background-on-hover="hover:bg-[#1DA1F2] "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SocialCard from "../socials/SocialCard.vue";

const socialsElement = ref();
const props = defineProps({
  socialsState: Object,
});

defineExpose({
  element: socialsElement,
});
</script>

<style scoped></style>
