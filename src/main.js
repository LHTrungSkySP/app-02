import { createApp } from 'vue'
import TheDeviceContent from "./components/layout/TheDeviceContent/TheDeviceContent.vue";
import TheOverview from "./components/layout/TheOverview/TheOverview.vue";
import TheContent from "./components/layout/TheContent/TheContent.vue";
import TheToast from "./components/base/TheToast.vue";
import { createRouter, createWebHistory } from "vue-router";
import VueExcelXlsx from "vue-excel-xlsx";
import App from './App.vue'

const routes = [
    { path: "/", component: TheContent },
    { path: "/device", component: TheDeviceContent },
    { path: "/overview", component: TheOverview }
  ];

  // Khởi tạo router
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });
const app=createApp(App)
app.component("TheToast",TheToast);
app
  .use(router)
  .use(VueExcelXlsx)
.mount("#app");


