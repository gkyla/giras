import { ref } from "vue";
import { defineStore } from "pinia";

export const useHome = defineStore("homeTab", () => {
  const image = ref(null);
  const lineOne = ref("Hello I'm");
  const lineTwo = ref("Giras Gendrasena");

  function edit(currentData) {
    lineOne.value = currentData.lineOne;
    lineTwo.value = currentData.lineTwo;
  }

  function revert(currentData) {
    console.log(currentData);
    currentData.lineOne = lineOne.value;
    currentData.lineTwo = lineTwo.value;

    return { ...currentData };
  }

  return { image, lineOne, lineTwo, edit, revert };
});
