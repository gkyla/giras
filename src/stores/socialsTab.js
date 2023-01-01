import { ref } from "vue";
import { defineStore } from "pinia";

export const useSocials = defineStore("socialsTab", () => {
  const facebook = ref();
  const instagram = ref("");
  const linkedin = ref("");
  const twitter = ref("");

  function revert(currentData) {
    currentData.facebook = facebook.value;
    currentData.instagram = instagram.value;
    currentData.linkedin = linkedin.value;
    currentData.twitter = twitter.value;

    return { ...currentData };
  }

  function edit(currentData) {
    facebook.value = currentData.facebook;
    instagram.value = currentData.instagram;
    linkedin.value = currentData.linkedin;
    twitter.value = currentData.twitter;
  }

  return { facebook, instagram, linkedin, twitter, edit, revert };
});
