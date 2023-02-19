<template>
  <div class="flex flex-col gap-4 border border-gray-100 shadow p-4">
    <div data-details="workbox-meta" class="flex items-center gap-4">
      <div>
        <img
          :src="imgUrl"
          alt="works-picture"
          class="w-[60px] h-[60px] block rounded-lg object-cover"
        />
      </div>
      <div class="self-start">
        <p class="font-semibold">{{ title }}</p>
        <p class="text-sm text-slate-700">{{ position }}</p>
        <span class="block">{{ date }}</span>
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
  position: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

const imgUrl = new URL(props.img, import.meta.url).href;
</script>

<style lang="scss" scoped></style>
