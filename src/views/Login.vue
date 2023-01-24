<template>
  <div class="flex justify-center items-center min-h-screen bg-slate-50">
    <form
      class="shadow-md rounded-md p-10 bg-white border border-t-4 border-t-[#85bc33]"
      @submit.prevent="submitForm"
    >
      <div class="mb-5">
        <h1 class="text-2xl font-semibold mb-2">Login</h1>
        <div class="heading_divider"></div>
      </div>
      <InputControl identifier="id" v-model="user.email">Email</InputControl>
      <InputControl identifier="password" input-type="password" v-model="user.password"
        >Password</InputControl
      >
      <div class="flex flex-col sm:flex-row justify-between mt-7 gap-4">
        <button
          class="font-semibold flex items-center hover:underline underline-offset-4 transition-all"
          type="button"
          @click="$router.push('/')"
        >
          <Icon icon="ic:round-arrow-back" />
          Back to Homepage
        </button>
        <div class="ml-auto sm:ml-[unset]">
          <button class="btn_close ml-auto" type="reset">Reset</button>
          <button class="btn_save ml-2" type="submit">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import InputControl from "../components/InputControl.vue";
import { Icon } from "@iconify/vue";
import { signIn } from "../libs/firebase";
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
  email: "",
  password: "",
});

async function submitForm() {
  try {
    await signIn(user);
    router.push("/content/home");
  } catch (error) {}
}
</script>

<style></style>
