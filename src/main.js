import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import {
  Button,
  Layout,
  Form,
  Input,
  Icon,
  Checkbox,
  Select,
  Col,
  Row,
  Menu,
  Notification
} from "ant-design-vue";

Vue.config.productionTip = false;

Vue.use(Layout);
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Notification);

const instance = axios.create({
  baseURL: "http://localhost:8088",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
});
Vue.prototype.$axios = instance;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
