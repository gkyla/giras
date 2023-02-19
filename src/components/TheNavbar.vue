<template>
  <header class="bg-white shadow-2xl fixed top-0 left-0 right-0 z-50">
    <div
      class="container mx-auto max-w-screen-xl flex items-center py-3 relative px-2"
    >
      <div class="absolute mr-auto text-white font-bold text-center">
        <div
          class="inline-flex items-center flex-col border-2 border-[#85bc33] py-1 px-3 rounded"
        >
          <p class="raleway text-slate-700 inline-block">Girasena</p>
          <span class="text-slate-700 text-xs inline-block">est 2022.</span>
        </div>
      </div>
      <nav
        class="mx-auto absolute lg:-translate-x-1/2 left-1/2 top-[62px] lg:top-1/2 lg:-translate-y-1/2 right-0 h-[calc(100vh-62px)] lg:h-auto bg-white transition-all flex flex-col shadow-xl lg:shadow-none overflow-y-auto lg:overflow-y-hidden"
        :class="[
          { 'translate-x-0': navIsOpened, 'translate-x-full': !navIsOpened },
        ]"
      >
        <div class="px-3 lg:hidden">
          <p
            class="lg:hidden text-lg font-bold p-2 border-b-2 border-slate-400"
          >
            Navigation
          </p>
        </div>
        <ul
          class="flex lg:items-center justify-center flex-col lg:flex-row [&>:not(li)]:mx-3 font-bold relative"
        >
          <li>
            <router-link
              to="#home"
              class="p-5 lg:p-0 flex transition-all"
              :class="[
                {
                  'lg:border-b-[3px] border-l-[6px] lg:border-l-0  bg-slate-100 lg:bg-white border-[#85bc33]':
                    currentSection === '0-navHeader',
                },
              ]"
              >Home</router-link
            >
          </li>
          <span class="hidden lg:inline-block">|</span>
          <li>
            <router-link
              to="#history"
              class="p-5 lg:p-0 flex transition-all"
              :class="[
                {
                  'lg:border-b-[3px] border-l-[6px] lg:border-l-0  bg-slate-100 lg:bg-white border-[#85bc33]':
                    currentSection === '1-navHeader',
                },
              ]"
              >History</router-link
            >
          </li>
          <span class="hidden lg:inline-block">|</span>
          <li>
            <router-link
              to="#aboutme"
              class="p-5 lg:p-0 flex transition-all"
              :class="[
                {
                  'lg:border-b-[3px] border-l-[6px] lg:border-l-0  bg-slate-100 lg:bg-white border-[#85bc33]':
                    currentSection === '2-navHeader',
                },
              ]"
              >About Me</router-link
            >
          </li>
          <span class="hidden lg:inline-block">|</span>
          <li>
            <router-link
              to="#myworks"
              class="p-5 lg:p-0 flex transition-all"
              :class="[
                {
                  'lg:border-b-[3px] border-l-[6px] lg:border-l-0 bg-slate-100 lg:bg-white border-[#85bc33]':
                    currentSection === '3-navHeader',
                },
              ]"
              >Experience</router-link
            >
          </li>
          <span class="hidden lg:inline-block">|</span>
          <li>
            <router-link
              to="#socials"
              class="p-5 lg:p-0 flex transition-all"
              :class="[
                {
                  'lg:border-b-[3px] border-l-[6px] lg:border-l-0  bg-slate-100 lg:bg-white border-[#85bc33]':
                    currentSection === '4-navHeader',
                },
              ]"
              >Socials</router-link
            >
          </li>
        </ul>
        <div class="px-3 mb-5 lg:hidden">
          <p
            class="lg:hidden text-lg font-bold p-2 border-b-2 border-slate-400"
          >
            Others
          </p>
        </div>
        <div class="lg:hidden flex flex-col md:flex-row px-4 gap-4 mb-3">
          <a
            href="mailto:giras.gendrasena@gmail.com"
            target="_blank"
            class="items-center border-2 border-[#85bc33] rounded-lg px-[16px] py-[10px] gap-4 font-semibold shadow-md group flex"
          >
            <Icon
              icon="mdi:email"
              class="text-[#85bc33]"
              width="25"
              height="25"
            />
            <p class="text-sm text-slate-800 overflow-hidden transition-all">
              Contact
            </p>
          </a>
          <button
            v-if="userState.isFirstTime"
            class="items-center border-2 border-[#85bc33] rounded-lg px-[16px] py-[10px] gap-4 font-semibold shadow-md flex"
          >
            <img :src="spinnerSVG" alt="" width="25" height="25" />
            <p class="text-sm text-slate-800 overflow-hidden transition-all">
              Loading..
            </p>
          </button>
          <button
            v-if="!userState.isAuthenticated && !userState.isFirstTime"
            class="items-center border-2 border-[#85bc33] rounded-lg px-[16px] py-[10px] gap-4 font-semibold shadow-md flex"
            @click="$router.push('/login')"
          >
            <Icon
              icon="mdi:user"
              class="text-[#85bc33]"
              width="25"
              height="25"
            />
            <p class="text-sm text-slate-800 overflow-hidden transition-all">
              Login
            </p>
          </button>
          <button
            v-if="userState.isAuthenticated && !userState.isFirstTime"
            class="items-center border-2 border-[#85bc33] rounded-lg px-[16px] py-[10px] gap-4 font-semibold shadow-md flex"
            @click="$router.push('/content/home')"
          >
            <Icon
              icon="material-symbols:edit"
              class="text-[#85bc33]"
              width="25"
              height="25"
            />
            <p class="text-sm text-slate-800 overflow-hidden transition-all">
              Edit
            </p>
          </button>
        </div>

        <div class="w-full bg-[#393E46] mt-auto lg:hidden">
          <div class="flex justify-between p-4 text-slate-100">
            <p class="text-[10px]">Copyright &copy; Giras Gendrasena 2022</p>
          </div>
        </div>
      </nav>
      <button class="ml-auto lg:hidden" @click="toggleNav">
        <Icon icon="icon-park:hamburger-button" width="40" height="40" />
      </button>
      <a
        href="mailto:giras.gendrasena@gmail.com"
        target="_blank"
        class="hidden lg:inline-flex items-center border-2 border-[#85bc33] text-white rounded-lg px-[16px] py-[5px] ml-auto shadow-md group"
      >
        <Icon icon="mdi:email" class="text-[#85bc33]" width="25" height="25" />
        <p
          class="text-sm text-slate-800 w-0 overflow-hidden group-hover:ml-2 group-hover:w-14 transition-all"
        >
          Contact
        </p>
      </a>
      <!-- Desktop -->
      <button
        v-if="userState.isFirstTime"
        class="items-center justify-center border-2 border-[#85bc33] rounded-lg px-[16px] py-[5px] gap-4 font-semibold shadow-md flex ml-2"
      >
        <img :src="spinnerSVG" class="inline-block" width="25" height="25" />
      </button>
      <button
        v-if="!userState.isAuthenticated && !userState.isFirstTime"
        class="hidden lg:inline-flex items-center border-2 border-[#85bc33] text-white rounded-lg px-[16px] py-[5px] ml-2 shadow-md group"
        @click="$router.push('/login')"
      >
        <Icon icon="mdi:user" class="text-[#85bc33]" width="25" height="25" />
        <p
          class="text-sm text-slate-800 w-0 overflow-hidden group-hover:w-14 transition-all"
        >
          Login
        </p>
      </button>
      <button
        v-if="userState.isAuthenticated && !userState.isFirstTime"
        class="hidden lg:inline-flex items-center border-2 border-[#85bc33] text-white rounded-lg px-[16px] py-[5px] ml-2 shadow-md group"
        @click="$router.push('/content/home')"
      >
        <Icon
          icon="material-symbols:edit"
          class="text-[#85bc33]"
          width="25"
          height="25"
        />
        <p
          class="text-sm text-slate-800 w-0 overflow-hidden group-hover:w-14 transition-all"
        >
          Content
        </p>
      </button>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useUserState } from "../stores/userState";

const emit = defineEmits(["navStatus"]);

const userState = useUserState();
const spinnerSVG = new URL("../assets/spinner.svg", import.meta.url).href;
const navIsOpened = ref(false);
const currentSection = ref("");

function toggleNav() {
  navIsOpened.value = !navIsOpened.value;
  emit("navStatus", navIsOpened.value);
}

onMounted(() => {
  const observe = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          currentSection.value = entry.target.getAttribute("id");
        }
      });
    },
    { rootMargin: "0px 0px -70% 0px" }
  );

  document.querySelectorAll('[id$="-navHeader"]').forEach((el) => {
    observe.observe(el);
  });
});
</script>

<style></style>
