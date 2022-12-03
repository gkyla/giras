<template>
  <InputControl identifier="homeimg" input-type="file">Background</InputControl>
  <InputControl identifier="title1" v-model="homeInput.lineOne"
    >Tittle Line 1</InputControl
  >
  <InputControl identifier="title2" v-model="homeInput.lineTwo"
    >Tittle Line 2</InputControl
  >
</template>

<script setup>
import { reactive } from "vue";

import InputControl from "../../components/InputControl.vue";

const homeInput = reactive({
  lineOne: "Hello I'm",
  lineTwo: "Giras Gendrasena",
});
</script>

<style lang="scss" scoped></style>
