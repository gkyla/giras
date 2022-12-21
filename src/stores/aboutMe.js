import { ref } from "vue";
import { defineStore } from "pinia";

export const useAboutMe = defineStore("aboutmeTab", () => {
  const sectionTitle = ref("About me");
  const displayImage = ref(null);
  const content = ref(
    "<ul><li>wewewewewewqq</li><li>Dua</li><li><br></li></ul>"
  );

  return { displayImage, content, sectionTitle };
});
