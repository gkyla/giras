<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import { getCurrentUser } from "./libs/firebase";
import { useUserState } from "./stores/userState";

const userState = useUserState();

/* Still need to initially get user for controlling
    UI (login & content)
*/
getCurrentUser().then((user) => {
  userState.$patch({ isFirstTime: false });
});
</script>

<style lang="scss"></style>
