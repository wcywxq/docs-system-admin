/*
 * @Author: magic
 * @Date: 2020-11-21 12:51:39
 * @LastEditTime: 2020-11-21 17:43:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog-client/src/main.js
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/index.scss";

const app = createApp(App);
app.config.devtools = true;

app
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount("#app");
