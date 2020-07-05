import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
    tid: localStorage.getItem('tid')
  },
  mutations: {
    getToken(state, user) {
      state.token = localStorage.getItem("token");
      state.user = user;
    },
    delToken(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tid");
      state.token = null;
      state.user = {
        name: "일반사용자",
        id: "없음",
        img: "https://randomuser.me/api/portraits/men/85.jpg",
      };
    },
    getTid(state, tid) {
      state.tid = tid
    }
  },
  actions: {},
  modules: {},

});
