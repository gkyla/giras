import { ref } from "vue";
import { defineStore } from "pinia";

export const useAboutMe = defineStore("aboutmeTab", () => {
  const displayImage = ref(null);
  const content = ref("");

  return { displayImage, content };
});
