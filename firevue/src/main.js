import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import cfg from "../config/config";
import VueRecaptcha from "vue-recaptcha";
import LoadScript from "vue-plugin-load-script";
Vue.prototype.$cfg = cfg;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:3000";

Vue.use(LoadScript);
Vue.loadScript(
  "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit"
)
  .then(() => {
    Vue.component("vue-recaptcha", VueRecaptcha);
  })
  .catch((e) => {
    console.error(`google api load failed: ${e.message}`);
  });
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
