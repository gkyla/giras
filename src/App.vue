<template>
  <!-- TODO: add some AOS effect to the element -->

  <header class="bg-white shadow-2xl fixed top-0 left-0 right-0 z-50">
    <div
      class="container mx-auto max-w-screen-xl flex items-center py-3 relative px-2"
    >
      <div class="absolute mr-auto text-white font-bold text-center">
        <div
          class="inline-flex items-center flex-col border-2 border-[#85bc33] py-1 px-3 rounded"
        >
          <p class="raleway text-slate-700 inline-block">Girasena</p>
          <span class="text-slate-700 text-xs inline-block">est 2022.</span>
        </div>
      </div>
      <nav
        class="mx-auto absolute lg:-translate-x-1/2 left-1/2 top-[62px] lg:top-1/2 lg:-translate-y-1/2 right-0 h-[calc(100vh-62px)] lg:h-auto bg-white transition-all flex flex-col shadow-xl lg:shadow-none"
        :class="[
          { 'translate-x-0': navIsOpened, 'translate-x-full': !navIsOpened },
        ]"
      >
        <div class="px-3 lg:hidden">
          <p
            class="lg:hidden text-lg font-bold p-2 border-b-2 border-slate-400"
          >
            Navigation
          </p>
        </div>
        <ul
          class="flex lg:items-center justify-center flex-col lg:flex-row [&>:not(li)]:mx-3 font-bold relative"
        >
          <li>
            <router-link to="#home" class="p-5 lg:p-0 flex">Home</router-link>
          </li>
          <span class="hidden lg:inline-block">|</span>
          <li>
            <router-link to="#history" class="p-5 lg:p-0 flex"
              >History</router-link
            >
          </li>
          <span class="hidden lg:inline-block">|</span>
          <li>
            <router-link to="#aboutme" class="p-5 lg:p-0 flex"
              >About Me</router-link
            >
          </li>
          <span class="hidden lg:inline-block">|</span>
          <li>
            <router-link to="#myworks" class="p-5 lg:p-0 flex"
              >My Works</router-link
            >
          </li>
          <span class="hidden lg:inline-block">|</span>
          <li>
            <router-link to="#socials" class="p-5 lg:p-0 flex"
              >Socials</router-link
            >
          </li>
        </ul>
        <div class="px-3 mb-5 lg:hidden">
          <p
            class="lg:hidden text-lg font-bold p-2 border-b-2 border-slate-400"
          >
            Others
          </p>
        </div>
        <div class="lg:hidden flex flex-col md:flex-row px-4 gap-4">
          <button
            class="items-center border-2 border-[#85bc33] rounded-lg px-[16px] py-[10px] gap-4 font-semibold shadow-md group flex"
          >
            <Icon
              icon="mdi:email"
              class="text-[#85bc33]"
              width="25"
              height="25"
            />
            <p class="text-sm text-slate-800 overflow-hidden transition-all">
              Contact
            </p>
          </button>
          <button
            class="items-center border-2 border-[#85bc33] rounded-lg px-[16px] py-[10px] gap-4 font-semibold shadow-md flex"
          >
            <Icon
              icon="clarity:sign-in-line"
              class="text-[#85bc33]"
              width="25"
              height="25"
            />
            <p class="text-sm text-slate-800 overflow-hidden transition-all">
              Login
            </p>
          </button>
        </div>

        <div class="w-full bg-[#393E46] mt-auto lg:hidden">
          <div class="flex justify-between p-4 text-slate-100">
            <p class="text-[10px]">Copyright &copy; Giras Gendrasena 2022</p>
          </div>
        </div>
      </nav>
      <button class="ml-auto" @click="toggleNav">
        <Icon icon="icon-park:hamburger-button" width="40" height="40" />
      </button>
      <button
        class="hidden items-center border-2 border-[#85bc33] text-white rounded-lg px-[16px] py-[5px] ml-auto shadow-md group"
      >
        <Icon icon="mdi:email" class="text-[#85bc33]" width="25" height="25" />
        <p
          class="text-sm text-slate-800 w-0 overflow-hidden group-hover:ml-2 group-hover:w-14 transition-all"
        >
          Contact
        </p>
      </button>
      <button
        class="hidden items-center border-2 border-[#85bc33] text-white rounded-lg px-[16px] py-[5px] ml-2 shadow-md group"
      >
        <Icon
          icon="clarity:sign-in-line"
          class="text-[#85bc33]"
          width="25"
          height="25"
        />
        <p
          class="text-sm text-slate-800 w-0 overflow-hidden group-hover:w-14 transition-all"
        >
          Login
        </p>
      </button>
    </div>
  </header>

  <!-- Wrapper -->
  <div
    class="transition-all lg:blur-none"
    :class="[{ 'blur-sm': navIsOpened }]"
  >
    <div
      id="home"
      class="w-full h-[600px] flex justify-center items-center relative z-[3] mt-14"
    >
      <img
        :src="userOptions.heroImage"
        class="w-full h-full brightness-[.83] bg-cover object-cover pointer-events-none"
      />
      <div
        class="font-bold text-4xl text-white text-center absolute z-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <p class="mb-4">Hello I'm</p>
        <p>Giras Gendrasena</p>
        <button
          class="rounded-full mt-4 px-4 py-1 bg-[#393E46] text-lg text-white shadow-xl"
          @click="$router.push('#history')"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Explore
        </button>
      </div>
    </div>

    <div id="history" class="mt-16">
      <div
        class="container mx-auto max-w-screen-xl sm:mb-16 md:mb-20 flex justify-center flex-col px-2"
      >
        <div class="flex gap-4 items-center justify-center text-center">
          <div
            id="bullet1"
            class="w-[15px] h-[15px] rounded-full bg-[#85bc33] pointer-events-none"
          ></div>
          <h1 class="text-4xl font-semibold text-slate-600">
            My Amazing History
          </h1>
          <div
            id="bullet1"
            class="w-[15px] h-[15px] rounded-full bg-[#85bc33] pointer-events-none"
          ></div>
        </div>
        <p class="mt-10 mx-auto text-center max-w-screen-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
          maiores, harum corporis minus nihil iusto eligendi distinctio.
          Obcaecati accusamus deleniti, quisquam in dolorum recusandae delectus
          iusto fugiat illo id saepe voluptatem ut consectetur sequi facere!
          Reiciendis assumenda consequatur cum nulla.
        </p>

        <div
          id="downarrow"
          class="mx-auto mt-[2rem] text-[#85bc33] p-2 bg-white rounded-full hover:shadow-md cursor-pointer transition-all"
          @click="$router.push('#firstHistory')"
        >
          <Icon icon="material-symbols:arrow-downward" width="60" height="60" />
        </div>
      </div>

      <div class="container mx-auto max-w-screen-xl mb-64 px-2">
        <div
          id="firstHistoryWrapper"
          class="grid lg:grid-cols-3 grid-rows-2 md:grid-rows-none place-items-end md:place-items-center lg:place-items-start px-3"
        >
          <div class="relative col-span-2 lg:col-span-1 mx-auto">
            <img
              src="./assets/img/polkadot.png"
              alt="polkadot pattern"
              class="w-[200px] h-[200px] absolute -hue-rotate-60 -top-16 -left-16"
            />
            <img
              src="./assets/img/project-list/thumb1.jpg"
              alt="forest"
              class="w-[430px] h-full relative z-10"
            />
          </div>
          <div class="lg:px-10 px-3 col-span-2 prose prose-lg self-start">
            <h1
              id="firstHistory"
              class="font-bold text-xl lg:text-2xl bg-[#85bc33] text-white inline-block px-2 py-2 shadow-lg mt-10 lg:mt-0"
            >
              National Aeronautics and Space Administration
            </h1>
            <span class="text-[#85bc33] mb-7 block"
              >Software Engineer Tech Lead, Fall 2015 - May 2019</span
            >
            <div>
              <p class="mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                repellat, modi facilis
                <span class="font-bold"
                  >dolor ex animi voluptatem autem doloremque adipisci odio
                  saepe maiores. Debitis minima,
                </span>
                doloribus modi dicta quis cumque repellendus recusandae,
                molestiae voluptatibus velit nihil. Iste, at. Cumque, atque
                quae.
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

        <div
          class="grid lg:grid-cols-3 grid-rows-2 md:grid-rows-none place-items-end md:place-items-center lg:place-items-start md:mt-40 -mt-10 px-3"
        >
          <div class="relative col-span-2 lg:col-span-1 mx-auto">
            <img
              src="./assets/img/polkadot.png"
              alt="polkadot pattern"
              class="w-[200px] h-[200px] absolute -hue-rotate-60 -top-16 -left-16"
            />
            <img
              src="./assets/img/project-list/thumb2.jpg"
              alt="forest"
              class="w-[430px] h-full relative z-10"
            />
          </div>
          <div class="lg:px-10 px-3 col-span-2 prose prose-lg self-start">
            <h1
              class="font-bold text-2xl bg-[#85bc33] text-white inline-block px-2 py-2 shadow-lg mt-10 lg:mt-0"
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                ex perspiciatis, repudiandae obcaecati autem eaque sit ipsam
                cumque, consectetur
                <span class="font-bold">
                  temporibus eveniet, fugit maxime totam dolor tenetur. Labore
                  ipsam ex quaerat corporis officia, consequuntur
                </span>

                optio dolores voluptatibus ad laborum veritatis assumenda minus,
                qui ipsum aut ipsa.
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

      <!-- Aboutme -->
      <div
        ref="aboutMe"
        id="aboutme"
        class="w-full min-h-[600px] bg-[#f4f7fb] flex justify-center p-10 mb-16"
      >
        <div
          class="container mx-auto max-w-screen-xl flex flex-col items-center px-2"
        >
          <div class="flex flex-col gap-4 items-center text-center">
            <h1
              class="text-4xl font-semibold text-slate-700 px-5 py-2 self-start"
            >
              About Me
            </h1>
            <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
          </div>

          <div
            class="grid lg:grid-cols-3 gap-4 place-items-center mt-20 max-w-[1120px]"
          >
            <div class="self-start text-xl col-span-2">
              <p class="mb-7">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
                perspiciatis totam nobis sequi nihild architecto consectetur
                itaque atque numquam perferendis, quasi velit magnam, iure harum
                aperiam vitae.
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
                perspiciatis totam nobis
                <span class="font-semibold">sequi nihil aliquid</span> cum fuga
                architecto consectetur itaque atque numquam perferendis, quasi
                velit magnam, iure harum aperiam vitae.
              </p>
            </div>
            <div class="col-span-2 lg:col-span-1">
              <img
                :src="userOptions.heroImage"
                class="lg:h-[300px] lg:w-[300px] rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- My Works -->
      <div
        id="myworks"
        class="container mx-auto max-w-screen-xl flex flex-col items-center justify-center mb-20 px-2"
      >
        <div class="flex flex-col gap-4 items-center justify-center mb-10">
          <h1
            class="text-4xl font-semibold text-slate-700 px-5 py-2 self-start"
          >
            My Works
          </h1>
          <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
        </div>
        <div
          id="worksbox"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-7"
        >
          <MiniCard
            title="Lorem ipsum dolor sit amet."
            date="10 March 2020"
            img="../assets/img/hero.jpg"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
            laborum maiores? Eligendi quia id ad?
          </MiniCard>

          <MiniCard
            title="Lorem ipsum dolor sit amet."
            date="10 March 2020"
            img="../assets/img/hero.jpg"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione!
          </MiniCard>

          <MiniCard
            title="Lorem ipsum dolor sit amet."
            date="10 March 2020"
            img="../assets/img/hero.jpg"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
            exercitationem quaerat velit est dolorem!
          </MiniCard>

          <MiniCard
            title="Lorem ipsum dolor sit amet."
            date="10 March 2020"
            img="../assets/img/hero.jpg"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
            explicabo libero hic in impedit eius magnam distinctio?
          </MiniCard>

          <MiniCard
            title="Lorem ipsum dolor sit amet."
            date="10 March 2020"
            img="../assets/img/hero.jpg"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore,
            laborum.
          </MiniCard>

          <MiniCard
            title="Lorem ipsum dolor sit amet."
            date="10 March 2020"
            img="../assets/img/hero.jpg"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            assumenda voluptatibus ad quae eligendi!
          </MiniCard>
        </div>
      </div>

      <!-- Socials -->
      <!-- TODO fix overlaping socials  -->
      <div
        ref="socials"
        id="socials"
        class="flex flex-col items-center justify-center bg-[#f4f7fb] relative min-h-[550px]"
      >
        <div class="p-10 z-20">
          <div
            class="flex container mx-auto max-w-screen-xl flex-col gap-4 items-center justify-center mb-10 text-center px-2"
          >
            <div class="flex flex-col items-center gap-3">
              <h1
                class="text-4xl font-semibold text-slate-700 px-5 py-2 self-start"
              >
                Socials
              </h1>
              <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div>
            </div>
            <p class="text-slate-700 max-w-screen-lg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus,
              similique animi et distinctio asperiores corrupti. Vitae deserunt
              eveniet asperiores magnam.
            </p>
          </div>
          <div class="container mx-auto max-w-screen-lg mb-20 px-2 relative">
            <div id="socialsbox" class="gap-5 grid lg:grid-cols-4 relative">
              <div
                class="group border bg-[#fafcfd] border-gray-100 shadow p-5 hover:bg-[#4267B2] relative overflow-hidden min-h-[155px] transition-all"
              >
                <p class="text-4xl raleway group-hover:text-white font-bold">
                  Facebook
                </p>
                <Icon
                  icon="iconoir:facebook"
                  width="100"
                  height="100"
                  class="absolute -bottom-7 group-hover:text-white"
                />
              </div>
              <div
                id="instagram-social"
                class="border border-gray-100 shadow p-5 min-h-[155px] relative overflow-hidden"
              >
                <p class="text-4xl raleway font-bold">Instagram</p>
                <Icon
                  icon="ph:instagram-logo-light"
                  width="100"
                  height="100"
                  class="absolute -bottom-7"
                />
              </div>
              <div
                class="group border bg-[#fafcfd] border-gray-100 shadow p-5 hover:bg-[#0077b5] relative overflow-hidden transition-all min-h-[155px]"
              >
                <p class="text-4xl raleway font-bold group-hover:text-white">
                  Linkedin
                </p>
                <Icon
                  icon="uit:linkedin-alt"
                  width="100"
                  height="100"
                  class="absolute -bottom-7 group-hover:text-white"
                />
              </div>
              <div
                class="group border bg-[#fafcfd] border-gray-100 shadow p-5 hover:bg-[#1DA1F2] relative overflow-hidden transition-all min-h-[155px]"
              >
                <p class="text-4xl raleway font-bold group-hover:text-white">
                  Twitter
                </p>
                <Icon
                  icon="uit:twitter-alt"
                  width="100"
                  height="100"
                  class="absolute -bottom-9 group-hover:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#393E46] h-full p-4">
        <div
          class="container mx-auto max-w-screen-lg text-center rounded-md p-4 text-white"
        >
          <div class="text-center mb-6">
            <div class="inline-flex flex-col items-center mb-5">
              <h1 class="text-3xl font-semibold px-5 py-2">Get in touch</h1>
              <!-- <div class="w-7 bg-[#85bc33] h-1 rounded-full"></div> -->
            </div>
            <p class="text-xl">
              Have any offers or any question ? we can talk more deeply here
            </p>
          </div>
          <a
            href="mailto:giras.gg@gmail.com"
            class="shadow-md px-4 py-2 inline-flex items-center rounded-md gap-4 border bg-[#393E46] text-white font-semibold text-xl"
          >
            Say hello
            <Icon icon="mdi:email" class="" width="25" height="25" />
          </a>
        </div>
      </div>

      <div class="w-full bg-[#393E46]">
        <div class="container mx-auto max-w-screen-lg">
          <!-- Footer -->
          <div class="flex justify-between p-4 text-slate-100">
            <p class="text-sm">Copyright &copy; Giras Gendrasena 2022</p>
            <p class="text-sm">Back to top</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <RouterView /> -->

  <!-- <div class="mt-60"></div> -->
</template>

<script setup>
import MiniCard from "./components/MiniCard.vue";

import { onMounted, reactive, ref } from "vue";
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
const socials = ref();
const navIsOpened = ref(false);
function toggleNav() {
  navIsOpened.value = !navIsOpened.value;
  console.log(navIsOpened.value);
}

onMounted(() => {
  /* Particle JS */
  particlesJS.load(
    socials.value.id,
    "/src/libs/particlesjs-bg.json",
    function () {
      console.log("callback - particles.js config loaded");
    }
  );
});
</script>

<style>
.particles-js-canvas-el {
  @apply blur-sm  absolute top-0 left-0 right-0 bottom-0;
  /* @apply absolute top-0 left-0 right-0 bottom-0; */
}
</style>

<style scoped>
canvas {
  /* @apply block; */
  /* @apply absolute z-0; */
}

.raleway {
  font-family: "Raleway", sans-serif;
}

#instagram-social {
  color: black;
  background: #fafcfd;
  /* transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms; */
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* #instagram-social:hover > * {
  color: white;
} */

#instagram-social:hover {
  color: white;
  background: linear-gradient(
    45deg,
    #405de6,
    #5851db,
    #833ab4,
    #c13584,
    #e1306c,
    #fd1d1d
  );
}

.our-gradient {
  /* background-image: linear-gradient(to bottom, #2b2b2b 0%, black 100%); */

  /* background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.15) 100%
    ),
    radial-gradient(
        at top center,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(0, 0, 0, 0.4) 120%
      )
      #989898;
  background-blend-mode: multiply, multiply; */

  /* background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%); */
}
</style>
