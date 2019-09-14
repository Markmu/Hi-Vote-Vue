import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user_login";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  }
});
