import "./assets/main.css";
import "ant-design-vue/dist/reset.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";

import {
  Drawer,
  List,
  Menu,
  Button,
  Card,
  Table,
  Modal,
  Input,
  Avatar,
  Select,
  Radio,
  DatePicker,
  // Grid,
  Row,
  Col,
  Checkbox,
  Upload,
  //   Message,
  TimePicker,
  InputNumber,
  Pagination,
  Form,
  Popover,
  Tag,
  Spin,
  Rate,
} from "ant-design-vue";

import { UploadOutlined } from "@ant-design/icons-vue";

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
app.use(Input);
app.use(Avatar);
app.use(Select);
app.use(Radio);
app.use(DatePicker);
app.use(Row);
app.use(Col);
// app.use(Grid);
app.use(Checkbox);
// app.use(Message);
app.use(Upload);
app.use(TimePicker);
app.use(InputNumber);
app.use(Pagination);
app.use(Form);
app.use(Popover);
app.use(Tag);
app.use(Spin);
app.use(Rate);

app.component("UploadOutlined", UploadOutlined);

app.use(createPinia());
app.use(router);

app.mount("#app");
