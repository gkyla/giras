<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component" :key="keyToForceUpdate" />
  </RouterView>
</template>

<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import {
  getCurrentUser,
  getDocuments,
  getEveryCollection,
} from "./libs/firebase";
import { useUserState } from "./stores/userState";

const userState = useUserState();
const keyToForceUpdate = ref("");

getCurrentUser().then((user) => {
  userState.$patch({ isFirstTime: false });
});

getEveryCollection().then(() => {
  /* Tricky trick to reupdate component after the data is finnaly coming */
  keyToForceUpdate.value += "updated-";
});
</script>

<style lang="scss"></style>
