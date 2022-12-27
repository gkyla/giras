<template>
  <div class="container mx-auto max-w-screen-xl">
    <div class="mt-20 flex items-center">
      <p class="text-xl font-bold">Welcome, Giras</p>

      <button class="bg-white px-5 py-2 btn_addNew ml-5" @click="logoutUser">
        logout
      </button>
    </div>
    <div
      class="container mx-auto max-w-screen-xl bg-white shadow-lg p-5 flex mt-5 mb-20 rounded-xl border border-t-4 border-t-[#85bc33]"
    >
      <div class="flex-none w-80 p-10">
        <div class="mb-5">
          <h1 class="font-semibold text-xl mb-2">Section Viewer</h1>
          <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
        </div>

        <aside class="flex flex-col mr-auto gap-5">
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
      <div class="flex-1 p-10 border-l-[3px] border-slate-200 relative">
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
