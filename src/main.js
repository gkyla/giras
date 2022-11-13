import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/tailwind.css"; /* Tailwind */
import "./assets/main.css"; /* base */

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
