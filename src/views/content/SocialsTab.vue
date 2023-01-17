<template>
  <form @submit.prevent="editSocials">
    <InputControl
      identifier="facebookLink"
      v-model="currentSocials.facebook"
      placeholder="https://www.facebook.com/username/"
      >Facebook</InputControl
    >
    <InputControl
      identifier="instagramLink"
      v-model="currentSocials.instagram"
      placeholder="https://www.instagram.com/username/"
      >Instagram</InputControl
    >
    <InputControl
      identifier="linkedinLink"
      v-model="currentSocials.linkedin"
      placeholder="https://www.linkedin.com/in/username/"
      >Linkedin</InputControl
    >
    <InputControl
      identifier="twitterLink"
      v-model="currentSocials.twitter"
      placeholder="https://twitter.com/username"
      >Twitter</InputControl
    >
    <div class="flex mt-16 gap-2 self-end">
      <button
        class="ml-auto"
        :class="{
          btn_close_clickable: isRevertable,
          btn_close_unclickable: !isRevertable,
        }"
        @click.self="handleRevert"
        type="button"
      >
        Revert
      </button>
      <button class="btn_save" type="submit">Save</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from "vue";

import InputControl from "../../components/InputControl.vue";
import { useSocials } from "../../stores/socialsTab";
import { addDocument, setDocument } from "../../libs/firebase";

const socialsState = useSocials();
const isRevertable = ref(false);

let currentSocials = reactive({
  facebook: socialsState.facebook,
  instagram: socialsState.instagram,
  linkedin: socialsState.linkedin,
  twitter: socialsState.twitter,
});

function compareableSocialsState() {
  return {
    facebook: socialsState.facebook,
    instagram: socialsState.instagram,
    linkedin: socialsState.instagram,
    twitter: socialsState.twitter,
  };
}

watch(currentSocials, (newVal, oldVal) => {
  if (JSON.stringify(newVal) === JSON.stringify(compareableSocialsState())) {
    isRevertable.value = false;
  } else {
    isRevertable.value = true;
  }
});

async function editSocials() {
  socialsState.edit(currentSocials);
  await setDocument("socials", "links", currentSocials);
  console.log("socials added");
}

function handleRevert() {
  currentSocials = reactive({ ...socialsState.revert(currentSocials) });
}
</script>

<style lang="scss" scoped></style>
