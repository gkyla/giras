<template>
  <TheNavbar @nav-status="(val) => (navIsOpened = val)" />

  <!-- Wrapper -->
  <div
    class="transition-all lg:blur-none"
    :class="[{ 'blur-sm': navIsOpened }]"
  >
    <Home :home-state="homeState" :socials-state="socialsState" />

    <div id="views-wrapper" class="">
      <!-- Aboutme -->
      <!-- bg-[#f4f7fb] -->
      <Aboutme :about-me-state="aboutMeState" />

      <!-- History headers -> My education -->
      <History :history-tab-state="historyTabState" />

      <!-- My Works -> Experience -->
      <Myworks :myWorksState="myWorksState" />

      <!-- Socials -->

      <Socials ref="socialsComponent" :socials-state="socialsState" />

      <TheFooter />
    </div>
  </div>
</template>

<script setup>
import TheNavbar from "../components/TheNavbar.vue";
import Home from "../components/homeview-content/Home.vue";
import Aboutme from "../components/homeview-content/Aboutme.vue";
import History from "../components/homeview-content/History.vue";
import Myworks from "../components/homeview-content/Myworks.vue";
import Socials from "../components/homeview-content/Socials.vue";
import TheFooter from "../components/homeview-content/TheFooter.vue";

import { onMounted, ref } from "vue";
import { useAboutMe } from "../stores/aboutMe";
import { useHistoryTab } from "../stores/historyTab";
import { useHome } from "../stores/homeTab";
import { useMyWorks } from "../stores/myWorksTab";
import { useSocials } from "../stores/socialsTab";

/* eslint-disable */
const socialsComponent = ref(null); /* Social section */
const navIsOpened = ref(false);

const aboutMeState = useAboutMe();
const historyTabState = useHistoryTab();
const homeState = useHome();
const myWorksState = useMyWorks();
const socialsState = useSocials();
const particleConfig = new URL("../libs/particlesjs-bg.json", import.meta.url)
  .href;

onMounted(() => {
  particlesJS.load(
    socialsComponent.value.element.id,
    particleConfig,
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
