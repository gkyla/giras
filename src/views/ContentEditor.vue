<template>
  <div
    class="container mx-auto max-w-screen-xl bg-white shadow-lg p-5 flex mt-20 rounded-xl"
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
    <div class="flex-1 p-10 border-l-[3px] border-slate-200">
      <div class="mb-5">
        <h1 class="font-semibold text-xl mb-2">Edit your content</h1>
        <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";

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
