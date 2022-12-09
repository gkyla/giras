import { ref } from "vue";
import { defineStore } from "pinia";

export const useInputState = defineStore("inputState", () => {
  const quillEditor = ref(null); /* Reffrence of quillEditor */

  return { quillEditor };
});
