<template>
  <InputControl
    identifier="facebookLink"
    v-model="SocialsInput.facebookLink"
    placeholder="https://www.facebook.com/username/"
    >Facebook</InputControl
  >
  <InputControl
    identifier="instagramLink"
    v-model="SocialsInput.instagramLink"
    placeholder="https://www.instagram.com/username/"
    >Instagram</InputControl
  >
  <InputControl
    identifier="linkedinLink"
    v-model="SocialsInput.linkedinLink"
    placeholder="https://www.linkedin.com/in/username/"
    >Linkedin</InputControl
  >
  <InputControl
    identifier="twitterLink"
    v-model="SocialsInput.twitterLink"
    placeholder="https://twitter.com/username"
    >Twitter</InputControl
  >
</template>

<script setup>
import { reactive } from "vue";

import InputControl from "../../components/InputControl.vue";

const SocialsInput = reactive({
  // lineOne: "Hello I'm",
  /* TODO: FIND MARKDOWN LIBS */
  facebookLink: "",
  instagramLink: "",
  linkedinLink: "",
  twitterLink: "",
});
</script>

<style lang="scss" scoped></style>
