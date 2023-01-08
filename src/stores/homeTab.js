import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useHome = defineStore("homeTab", () => {
  const imgLink = ref(null);
  const lineOne = ref("");
  const lineTwo = ref("");
  const id = ref(null);

  function edit(currentData) {
    id.value = currentData.id;
    lineOne.value = currentData.lineOne;
    lineTwo.value = currentData.lineTwo;
    imgLink.value = currentData.imgLink;
  }

  function revert(currentData) {
    console.log(currentData);
    currentData.lineOne = lineOne.value;
    currentData.lineTwo = lineTwo.value;

    return { ...currentData };
  }

  const getAll = computed(() => {
    return {
      imgLink: imgLink.value,
      lineOne: lineOne.value,
      lineTwo: lineTwo.value,
      id: id.value,
    };
  });

  return { imgLink, lineOne, lineTwo, edit, revert, id, getAll };
});
