import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/scss/app.scss";
import router from "@/router";

createApp(App).use(router).mount("#app");
