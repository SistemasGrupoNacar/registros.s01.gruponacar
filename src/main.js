import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import es from "element-plus/es/locale/lang/es";

import "@/assets/index.css"
import "@/assets/index.scss";

import 'bootstrap/dist/css/bootstrap.css'

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: es,
  })
  .mount("#app");
