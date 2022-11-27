<template>
  <a :href="link">
    <div
      :id="$attrs.id"
      class="group border bg-[#fafcfd] border-gray-100 shadow p-5 relative overflow-hidden min-h-[155px] transition-all"
      data-aos="zoom-in-up"
      data-aos-duration="800"
      :class="backgroundOnHover"
    >
      <p class="text-4xl raleway group-hover:text-white font-bold">
        {{ name }}
      </p>
      <Icon
        :icon="iconify.icon"
        :width="iconify.width"
        :height="iconify.height"
        class="absolute -bottom-7 group-hover:text-white"
      />
    </div>
  </a>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  name: {
    type: String /* Facebook, instagram, etc.. */,
    required: true,
  },
  link: {
    type: String,
    default: "#",
  },
  iconify: {
    type: Object,
    required: true,
  },
  backgroundOnHover: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
#instagram-social {
  color: black;
  background: #fafcfd;
  /* transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms; */
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* #instagram-social:hover > * {
  color: white;
} */

#instagram-social:hover {
  color: white;
  background: linear-gradient(
    45deg,
    #405de6,
    #5851db,
    #833ab4,
    #c13584,
    #e1306c,
    #fd1d1d
  );
}
</style>
