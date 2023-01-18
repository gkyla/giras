import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueDOMPurifyHTML from "vue-dompurify-html";
import "./libs/particles"; /* TODO: move bellow mount app */

import "./assets/tailwind.css"; /* Tailwind */
import "./assets/main.css"; /* base */

/* AOS */
import "aos/dist/aos.css";
import AOS from "aos";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueDOMPurifyHTML);
app.mount("#app");
AOS.init();
