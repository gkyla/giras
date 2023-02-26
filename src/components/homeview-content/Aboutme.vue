<template>
  <div
    ref="aboutMe"
    id="aboutme"
    class="w-full min-h-[600px] flex justify-center py-16 p-10 mb-16"
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
        class="grid lg:grid-cols-3 gap-4 place-items-center mt-10 md:mt-20 max-w-[1120px]"
        data-aos="fade-up"
        data-aos-duration="1300"
      >
        <div
          class="self-start text-xl col-span-2 prose prose-content-spacing mb-10"
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
</template>

<script setup>
const props = defineProps({
  aboutMeState: Object,
});
</script>

<style scoped></style>
