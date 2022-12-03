<template>
  <InputControl identifier="image1" input-type="file"
    >display Image</InputControl
  >
  <!-- <InputControl
    identifier="title2"
    v-model="AboutmeInput.lineTwo"
    input-type="textarea"
    :row="7"
    >Tittle Line 2</InputControl
  > -->
  <InputControl
    identifier="quill"
    input-type="textarea"
    v-model:model-value="AboutmeInput.lineTwo"
    >About me</InputControl
  >

  <button @click="logBro">log</button>
</template>

<script setup>
import { reactive, onMounted } from "vue";

import InputControl from "../../components/InputControl.vue";

function logBro() {
  console.log(AboutmeInput.lineTwo);
}

const AboutmeInput = reactive({
  // lineOne: "Hello I'm",
  /* TODO: FIND MARKDOWN LIBS */

  /* this  need to be delta object */
  lineTwo: {
    ops: [],
  },
});
</script>

<style lang="scss" scoped></style>
