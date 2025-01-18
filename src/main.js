import "./assets/main.css";
import "ant-design-vue/dist/reset.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";

import { Drawer, List, Menu, Button, Card, Table, Modal } from "ant-design-vue";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(Drawer);
app.use(List);
app.use(Menu);
app.use(Button);
app.use(Card);
app.use(Table);
app.use(Modal);

app.use(createPinia());
app.use(router);

app.mount("#app");
