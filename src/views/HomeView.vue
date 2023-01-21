<template>
  <TheNavbar @nav-status="(val) => (navIsOpened = val)" />

  <!-- Wrapper -->
  <div
    class="transition-all lg:blur-none"
    :class="[{ 'blur-sm': navIsOpened }]"
  >
    <div
      id="home"
      class="w-full h-[600px] flex justify-center items-center relative z-[3] mt-14"
    >
      <img
        id="0-navHeader"
        :src="homeState.imgLink"
        class="w-full h-full brightness-[.75] bg-cover object-cover pointer-events-none"
      />
      <div
        class="font-bold text-4xl text-white text-center absolute z-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <p class="mb-4">Hello I'm</p>
        <p>Giras Gendrasena</p>
        <button
          class="rounded-full mt-4 px-4 py-1 bg-[#393E46] text-lg text-white shadow-xl"
          @click="$router.push('#history')"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Explore
        </button>
      </div>
    </div>

    <div id="history" class="mt-[5.5rem]">
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
        <p class="mt-10 mx-auto text-center max-w-screen-lg">
          {{ historyTabState.headlineDescription }}
        </p>

        <div
          id="downarrow"
          class="mx-auto mt-[2rem] text-[#85bc33] p-2 bg-white rounded-full hover:shadow-md cursor-pointer transition-all"
          @click="$router.push('#firstHistory')"
        >
          <Icon icon="material-symbols:arrow-downward" width="60" height="60" />
        </div>
      </div>
      <!-- id="firstHistoryWrapper" -->

      <div class="container mx-auto max-w-screen-xl mb-64 px-2">
        <div
          class="grid lg:grid-cols-3 grid-rows-2 md:grid-rows-none place-items-end md:place-items-center lg:place-items-start md:mt-40 -mt-10 px-3"
          data-aos="fade-up"
          data-aos-duration="1300"
          v-for="(post, index) in historyTabState.posts"
          :key="post.title"
        >
          <div class="relative col-span-2 lg:col-span-1 mx-auto">
            <img
              src="../assets/img/polkadot.png"
              alt="polkadot pattern"
              class="w-[200px] h-[200px] absolute -hue-rotate-60 -top-16 -left-16"
            />
            <img
              :src="post.imgLink"
              :alt="post.title"
              class="w-[430px] h-full relative z-10 shadow"
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
            <div v-dompurify-html="post.historyContent" class=""></div>
          </div>
        </div>
      </div>

      <!-- Aboutme -->
      <div
        ref="aboutMe"
        id="aboutme"
        class="w-full min-h-[600px] bg-[#f4f7fb] flex justify-center p-10 mb-16"
      >
        <div
          class="container mx-auto max-w-screen-xl flex flex-col items-center px-2"
        >
          <div class="flex flex-col gap-4 items-center text-center">
            <h1
              class="text-4xl font-semibold text-slate-700 px-5 py-2 self-start"
              id="2-navHeader"
            >
              About Me
            </h1>
            <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
          </div>

          <div
            class="grid lg:grid-cols-3 gap-4 place-items-center mt-20 max-w-[1120px]"
            data-aos="fade-up"
            data-aos-duration="1300"
          >
            <div
              class="self-start text-xl col-span-2 prose prose-content-spacing"
              v-dompurify-html="aboutMeState.content"
            ></div>
            <div class="col-span-2 lg:col-span-1">
              <img
                :src="aboutMeState.imgLink"
                class="lg:h-[300px] lg:w-[300px] rounded-md object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- My Works -->
      <div
        id="myworks"
        class="container mx-auto max-w-screen-xl flex flex-col items-center justify-center mb-20 px-2"
      >
        <div class="flex flex-col gap-4 items-center justify-center mb-10">
          <h1
            class="text-4xl font-semibold text-slate-700 px-5 py-2 self-start"
            id="3-navHeader"
          >
            My Works
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
            data-aos="zoom-in-up"
            data-aos-duration="800"
          >
            <div v-dompurify-html="work.content"></div>
          </MiniCard>
        </div>
      </div>

      <!-- Socials -->
      <div
        ref="socials"
        id="socials"
        class="flex flex-col items-center justify-center bg-[#f4f7fb] relative min-h-[550px]"
      >
        <div class="p-10 z-20">
          <div
            class="flex container mx-auto max-w-screen-xl flex-col gap-4 items-center justify-center mb-10 text-center px-2"
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus,
              similique animi et distinctio asperiores corrupti. Vitae deserunt
              eveniet asperiores magnam.
            </p>
          </div>
          <div class="container mx-auto max-w-screen-lg mb-20 px-2 relative">
            <div id="socialsbox" class="gap-5 grid lg:grid-cols-4 relative">
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

      <div class="bg-[#393E46] h-full p-4">
        <div
          class="container mx-auto max-w-screen-lg text-center rounded-md p-4 text-white"
        >
          <div class="text-center mb-6">
            <div class="inline-flex flex-col items-center mb-5">
              <h1 class="text-3xl font-semibold px-5 py-2">Get in touch</h1>
              <!-- <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div> -->
            </div>
            <p class="text-xl">
              Have any offers or any question ? we can talk more deeply here
            </p>
          </div>
          <a
            href="mailto:giras.gg@gmail.com"
            class="shadow-md px-4 py-2 inline-flex items-center rounded-md gap-4 border bg-[#393E46] text-white font-semibold text-xl"
          >
            Say hello
            <Icon icon="mdi:email" class="" width="25" height="25" />
          </a>
        </div>
      </div>

      <div class="w-full bg-[#393E46]">
        <div class="container mx-auto max-w-screen-lg">
          <!-- Footer -->
          <div class="flex justify-between p-4 text-slate-100">
            <p class="text-sm">Copyright &copy; Giras Gendrasena 2022</p>
            <router-link to="#home" class="text-sm hover:underline"
              >Back to top</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheNavbar from "../components/TheNavbar.vue";
import MiniCard from "../components/MiniCard.vue";
import SocialCard from "../components/socials/SocialCard.vue";

import { onMounted, reactive, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useAboutMe } from "../stores/aboutMe";
import { useHistoryTab } from "../stores/historyTab";
import { useHome } from "../stores/homeTab";
import { useMyWorks } from "../stores/myWorksTab";
import { useSocials } from "../stores/socialsTab";
import { dateFormat } from "../libs/utils";

/* eslint-disable */
const userOptions = reactive({
  heroImage: new URL("../assets/img/hero.jpg", import.meta.url).href,
});
const socials = ref(); /* Social section */
const navIsOpened = ref(false);

const aboutMeState = useAboutMe();
const historyTabState = useHistoryTab();
const homeState = useHome();
const myWorksState = useMyWorks();
const socialsState = useSocials();

onMounted(() => {
  particlesJS.load(
    socials.value.id,
    "/src/libs/particlesjs-bg.json",
    function () {
      console.log("callback - particles.js config loaded");
    }
  );
});
</script>

<style>
.particles-js-canvas-el {
  @apply blur-sm absolute top-0 left-0 right-0 bottom-0;
}
</style>

<style scoped>
.force-zero-space {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}

.raleway {
  font-family: "Raleway", sans-serif;
}
</style>
