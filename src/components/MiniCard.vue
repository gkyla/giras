<template>
  <div class="flex flex-col gap-4 border border-gray-100 shadow p-4">
    <div data-details="workbox-meta" class="flex items-center gap-4">
      <div>
        <img
          :src="imgUrl"
          alt="works-picture"
          class="w-[55px] h-[55px] block rounded-lg"
        />
      </div>
      <div class="self-start">
        <p class="font-semibold">{{ title }}</p>
        <span class="">{{ date }}</span>
      </div>
    </div>
    <div data-details="workbox-description" class="flex items-center">
      <p>
        <slot />
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

const imgUrl = new URL(props.img, import.meta.url).href;
console.log(imgUrl);
</script>

<style lang="scss" scoped></style>
