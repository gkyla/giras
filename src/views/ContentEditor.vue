<template>
  <div class="container mx-auto max-w-screen-xl p-4">
    <div class="flex items-center mt-10 min-w-fit">
      <div
        class="mt-auto flex flex-col items-center justify-center sm:flex-row sm:justify-between w-full"
      >
        <button
          class="font-semibold flex items-center hover:underline underline-offset-4 transition-all mb-6 sm:mb-[unset]"
          type="button"
          @click="$router.push('/')"
        >
          <Icon icon="ic:round-arrow-back" />
          Back to Homepage
        </button>
        <div class="flex items-center sm:ml-auto">
          <p class="text-xl font-bold">Welcome, Giras</p>

          <button class="bg-white px-5 py-2 btn_addNew ml-5" @click="logoutUser">
            logout
          </button>
        </div>
      </div>
    </div>
    <div
      class="container mx-auto max-w-screen-xl min-w-fit bg-white shadow-lg p-5 flex flex-col lg:flex-row mt-5 mb-20 rounded-xl border border-t-4 border-t-[#85bc33] relative"
    >
      <div class="flex-none w-full lg:w-80 p-10">
        <div class="mb-5">
          <h1 class="font-semibold text-xl mb-2">Section Viewer</h1>
          <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
        </div>

        <aside class="grid grid-cols-2 lg:grid-cols-1 mr-auto gap-5">
          <router-link
            class="px-5 py-2 border-2 border-slate-500 rounded-md shadow-md font-semibold"
            to="/content/home"
          >
            Home
          </router-link>
          <router-link
            class="px-5 py-2 border-2 border-slate-500 rounded-md shadow-md font-semibold"
            to="/content/history"
          >
            History
          </router-link>
          <router-link
            class="px-5 py-2 border-2 border-slate-500 rounded-md shadow-md font-semibold"
            to="/content/aboutme"
          >
            About Me
          </router-link>
          <router-link
            class="px-5 py-2 border-2 border-slate-500 rounded-md shadow-md font-semibold"
            to="/content/myworks"
          >
            My Works
          </router-link>
          <router-link
            class="px-5 py-2 border-2 border-slate-500 rounded-md shadow-md font-semibold"
            to="/content/socials"
          >
            Socials
          </router-link>
        </aside>
      </div>
      <div
        class="flex-1 p-10 border-t-[3px] lg:border-t-0 lg:border-l-[3px] ] border-slate-200 relative"
      >
        <div class="mb-5">
          <h1 class="font-semibold text-xl mb-2">Edit your content</h1>
          <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
import { logout } from "../libs/firebase";
import { useRouter } from "vue-router";
import { useUserState } from "../stores/userState";
import { Icon } from "@iconify/vue";

const router = useRouter();
const userState = useUserState();

async function logoutUser() {
  await logout();
  router.push("/login");
}

// Home
// |
// History
// |
// About Me
// |
// My Works
// |
// Socials
</script>

<style>
html {
  @apply bg-slate-50 w-full h-full;
}
</style>

<style scoped>
.router-link-exact-active {
  @apply border-[#85bc33] transition-all;
}
</style>
