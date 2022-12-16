<template>
  <form @submit.prevent="editHome">
    <InputControl identifier="homeimg" input-type="file">Background</InputControl>
    <InputControl identifier="title1" v-model="currentHomeState.lineOne"
      >Tittle Line 1</InputControl
    >
    <InputControl identifier="title2" v-model="currentHomeState.lineTwo"
      >Tittle Line 2</InputControl
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
import { watch, ref } from "vue";

import InputControl from "../../components/InputControl.vue";
import { useHome } from "../../stores/homeTab";

const isRevertable = ref(false);
const homeState = useHome();

const currentHomeState = ref({
  lineOne: homeState.lineOne,
  lineTwo: homeState.lineTwo,
});

function compareableHomeState() {
  return {
    lineOne: homeState.lineOne,
    lineTwo: homeState.lineTwo,
  };
}

watch(
  currentHomeState,
  (newVal, oldVal) => {
    if (JSON.stringify(newVal) === JSON.stringify(compareableHomeState())) {
      isRevertable.value = false;
    } else {
      isRevertable.value = true;
    }
  },
  { deep: true }
);

function handleRevert() {
  currentHomeState.value = homeState.revert({ ...currentHomeState.value });
}

function editHome() {
  homeState.edit({ ...currentHomeState.value });
}
</script>

<style lang="scss" scoped></style>
