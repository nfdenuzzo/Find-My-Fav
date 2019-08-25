import Vue from "vue";
import "babel-polyfill";
import Vuetify from "vuetify";
import App from "./App.vue";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons/iconfont/material-icons.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "font-awesome/css/font-awesome.min.css";
import { store } from "../src/store";
import router from "./router/";
import { VTooltip, VPopover, VClosePopover } from "v-tooltip";
import "./http/";
import "./plugins/element.js";
import "animate.css";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.directive("tooltip", VTooltip);
Vue.directive("close-popover", VClosePopover);
Vue.component("v-popover", VPopover);

window.app = new Vue({
  data: {
    client_id: localStorage.getItem("client_id")
  },
  store: store,
  router,
  render: h => h(App)
}).$mount("#app");
