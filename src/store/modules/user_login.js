import * as localStorage from "../utils/localStorage";

export const state = {
  isLogin: false,
  userInfo: {},
  email: ""
};

export const getters = {
  isLogin: state => state.isLogin,
  userInfo: state => state.userInfo,
  email: state => state.email
};

export const mutations = {
  user_login(state, flag) {
    state.isLogin = flag;
  },
  set_basic_info(state, data) {
    state.userInfo = data;
    localStorage.user_info.set(state.userInfo);
  },
  clear_basic_info(state) {
    state.userInfo = "";
    localStorage.user_info.clear();
  }
};

export const actions = {
  user_login({ commit }, flag) {
    commit("user_login", flag);
  },
  set_basic_info({ commit }, data) {
    commit("set_basic_info", data);
  },
  clear_basic_info({ commit }) {
    commit("clear_basic_info");
  }
};
