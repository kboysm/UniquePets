import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import cfg from "../config/config";
import VueRecaptcha from "vue-recaptcha";
import LoadScript from "vue-plugin-load-script";
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.prototype.$cfg = cfg;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:3000";


Vue.use(VueGoogleMaps, {
  load: {
    key: cfg.googleMap,
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})

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
