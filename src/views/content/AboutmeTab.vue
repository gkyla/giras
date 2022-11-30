<template>
  <InputControl identifier="image1" input-type="file"
    >display Image</InputControl
  >
  <InputControl
    identifier="title2"
    v-model="AboutmeInput.lineTwo"
    input-type="textarea"
    :row="7"
    >Tittle Line 2</InputControl
  >
</template>

<script setup>
import { reactive } from "vue";

import InputControl from "../../components/InputControl.vue";

const AboutmeInput = reactive({
  // lineOne: "Hello I'm",
  /* TODO: FIND MARKDOWN LIBS */
  lineTwo:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus perspiciatis totam nobis sequi nihild architecto consectetur itaque atque numquam perferendis, quasi velit magnam, iure harum aperiam vitae. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus perspiciatis totam nobis sequi nihil aliquid cum fuga architecto consectetur itaque atque numquam perferendis, quasi velit magnam, iure harum aperiam vitae",
});
</script>

<style lang="scss" scoped></style>
