import { ref } from "vue";
import { defineStore } from "pinia";

export const useAboutMe = defineStore("aboutmeTab", () => {
  const displayImage = ref(null);
  const content = ref(
    "<ul><li>wewewewewewqq</li><li>Dua</li><li><br></li></ul>"
  );

  function revert(currentData) {
    currentData.displayImage = displayImage.value;
    currentData.content = content.value;

    return { ...currentData };
  }

  function edit(currentData) {
    displayImage.value = currentData.displayImage;
    content.value = currentData.content;
  }

  return { displayImage, content, edit, revert };
});
