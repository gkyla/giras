<template>
  <footer id="footer" ref="theFooter">
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
          href="mailto:giras.gendrasena@gmail.com"
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
          <p class="text-sm">Copyright &copy; Giras Gendrasena 2022-2023</p>
          <router-link to="#home" class="text-sm hover:underline"
            >Back to top</router-link
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<style scoped></style>
