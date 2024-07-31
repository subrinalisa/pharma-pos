import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueApexCharts from "vue3-apexcharts";
import { createPinia } from "pinia";
import { createApp } from "vue";

import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/style.scss";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router).use(Antd).use(pinia).use(VueApexCharts).mount("#app");
