<template>
  <!-- TODO: Find how to scroll behavior on vue (its different i think ?) -->

  <header class="bg-white shadow-2xl fixed top-0 left-0 right-0 z-50">
    <div
      class="container mx-auto max-w-screen-xl flex items-center py-3 relative"
    >
      <div
        class="bg-[#85bc33] h-[90px] p-5 absolute mr-auto text-white font-bold text-center shadow-xl"
      >
        <div class="mt-2">
          <p>Giras</p>
          <p>Gendrasena</p>
        </div>
      </div>
      <nav class="mx-auto absolute -translate-x-1/2 left-1/2">
        <ul class="flex items-center [&>:not(li)]:mx-3">
          <li><router-link to="#home">Home</router-link></li>
          <span>/</span>
          <li><router-link to="#history">History</router-link></li>
          <span>/</span>
          <li><router-link to="#socials">Socials</router-link></li>
          <span>/</span>
          <li><router-link to="#contact">Contact</router-link></li>
        </ul>
      </nav>
      <button
        class="flex items-center bg-[#85bc33] text-white rounded-full px-[16px] py-[5px] ml-auto shadow-md"
      >
        <Icon icon="mdi:email" width="25" height="25" />
        <p class="ml-2 text-sm">Email me</p>
      </button>
      <button
        class="flex items-center bg-[#85bc33] text-white rounded-full px-[16px] py-[5px] ml-2 shadow-md"
      >
        <Icon icon="clarity:sign-in-line" width="25" height="25" />
        <p class="ml-2 text-sm">Login</p>
      </button>
    </div>
  </header>

  <div
    id="hero"
    class="w-full h-[600px] flex justify-center items-center relative z-[3] mt-14"
  >
    <img
      :src="userOptions.heroImage"
      class="w-full h-full brightness-[.83] bg-cover object-cover pointer-events-none"
    />
    <div class="font-bold text-4xl text-white text-center absolute z-10">
      <p class="mb-4">Hello I'm</p>
      <p>Giras Gendrasena</p>
      <button
        class="rounded-full mt-4 px-4 py-1 bg-[#393E46] text-lg text-white shadow-xl"
      >
        Explore
      </button>
    </div>

    <!-- <div
      class="grid grid-cols-3 gap-6 absolute -bottom-16 bg-white text-slate-900 shadow-xl p-5"
    >
      <div class="flex flex-col items-center">
        <Icon icon="la:business-time" width="50" height="50" />
        <p class="text-lg font-bold">Flexibel working hours</p>
      </div>
      <div class="flex flex-col items-center">
        <Icon icon="la:business-time" width="50" height="50" />
        <p class="text-lg font-bold">Flexibel working hours</p>
      </div>
      <div class="flex flex-col items-center">
        <Icon icon="la:business-time" width="50" height="50" />
        <p class="text-lg font-bold">Flexibel working hours</p>
      </div>
    </div> -->
  </div>

  <div id="history" class="mt-24">
    <div class="container mx-auto max-w-screen-xl">
      <h1 class="text-2xl font-semibold mb-10">- My Amazing History</h1>
    </div>

    <div class="container mx-auto max-w-screen-xl">
      <div class="grid grid-cols-3 place-items-center">
        <img
          src="./assets/img/project-list/thumb1.jpg"
          alt="forest"
          class="w-[430px] h-full"
        />
        <div class="px-10 col-span-2 prose prose-lg self-start">
          <h1
            class="font-bold text-2xl bg-[#85bc33] text-white inline-block px-2 py-2 shadow-lg"
          >
            National Aeronautics and Space Administration
          </h1>
          <span class="text-[#85bc33] mb-7 block"
            >Software Engineer Tech Lead, Fall 2015 - May 2019</span
          >
          <div>
            <p class="mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              repellat, modi facilis dolor ex animi voluptatem autem doloremque
              adipisci odio saepe maiores. Debitis minima, doloribus modi dicta
              quis cumque repellendus recusandae, molestiae voluptatibus velit
              nihil. Iste, at. Cumque, atque quae.
            </p>

            <p class="mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              laboriosam dolorem similique odit maiores neque eveniet sit
              repudiandae ut aliquam.
            </p>
          </div>

          <ul>
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem,
              molestias!
            </li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor, sit amet consectetur adipisicing.</li>
          </ul>
        </div>
      </div>

      <div class="grid grid-cols-3 place-items-center mt-32">
        <img
          src="./assets/img/project-list/thumb2.jpg"
          alt="forest"
          class="w-[430px] h-full"
        />
        <div class="px-10 col-span-2 prose prose-lg self-start">
          <h1
            class="font-bold text-2xl bg-[#85bc33] text-white inline-block px-2 py-2 shadow-lg"
          >
            Facebook Gaming
          </h1>
          <span class="text-[#85bc33] mb-7 block"
            >CEO, Fall 2015 - May 2019</span
          >
          <div>
            <p class="mb-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id
              commodi ipsam facilis atque, vitae praesentium non quo, ipsa
              doloremque debitis labore earum a repudiandae veritatis
              necessitatibus laboriosam. At, quo animi!
            </p>

            <p class="mb-6">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis ex
              perspiciatis, repudiandae obcaecati autem eaque sit ipsam cumque,
              consectetur temporibus eveniet,
              <span class="font-bold">
                fugit maxime totam dolor tenetur. Labore ipsam ex quaerat
                corporis officia, consequuntur optio dolores voluptatibus ad
                laborum veritatis assumenda minus, qui ipsum aut ipsa.
              </span>
            </p>
          </div>

          <ul>
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem,
              molestias!
            </li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor, sit amet consectetur adipisicing.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- <RouterView /> -->

  <div class="mt-60"></div>
</template>

<script setup>
import { reactive } from "vue";
import { Icon } from "@iconify/vue";

/* eslint-disable */
const userOptions = reactive({
  heroImage: new URL("./assets/img/hero.jpg", import.meta.url).href,
  // projectList: [
  //   {
  //     title: "idk",
  //     img: new URL("./assets/img/project-list/forest.jpg", import.meta.url)
  //       .href,
  //   },
  // ],
});
</script>

<style scoped></style>
