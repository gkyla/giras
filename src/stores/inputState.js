import { ref } from "vue";
import { defineStore } from "pinia";

export const useInputState = defineStore("inputState", () => {
  const quillEditor = ref({}); /* Reffrence of quillEditor */
  const currentIdentifierSelection = ref(null);

  function is(id) {
    // return quillEditor.value.find((obj) => {
    //   return obj.identifier === id;
    // });
  }

  return { quillEditor, is, currentIdentifierSelection };
});
