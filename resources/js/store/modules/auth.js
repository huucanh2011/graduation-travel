import {
  register,
  login,
  logout,
  refresh,
  me,
  forgotPassword,
  resetPassword
} from "@/api/Authentication";
import { getToken, saveToken, destroyToken } from "@/helpers/jwt.service";
import { setHeader } from "@/helpers/set-header";
import { vp } from "@/helpers/tools";

const state = {
  user: null,
  token: getToken(),
  loading: false,
  loggedIn: !!getToken()
};
const getters = {
  user(state) {
    return state.user;
  },
  loading(sate) {
    return sate.loading;
  },
  loggedIn(state) {
    return state.loggedIn;
  }
};
const actions = {
  async login({ commit }, credentials) {
    return new Promise((reslove, reject) => {
      commit("setLoading");
      login(credentials)
        .then(({ data, status }) => {
          if (data && status === 200) {
            commit("setAuth", data);
            vp.$notify.success("Logged in", "Đăng nhập thành công");
            reslove(data);
          }
        })
        .catch(({ response }) => {
          if (response && response.status === 401) {
            const message = Object.values(response.data.message);
            vp.$notify.error("Lỗi đăng nhập", message);
          }
        })
        .finally(() => {
          commit("purgeLoading");
        });
    });
  },
  async register({ commit }, credentials) {
    return new Promise((reslove, reject) => {
      commit("setLoading");
      register(credentials)
        .then(({ data, status }) => {
          if (data && status === 200) {
            commit("setAuth", data);
            reslove(data);
            vp.$notify.success("Logged in", "Đăng ký thành công");
            setTimeout(() => {
              vp.$message.info("Bạn đã đăng nhập");
            }, 1000);
          }
        })
        .catch(({ response }) => {
          if (response && response.status === 422) {
            const message = Object.values(response.data.message)[0];
            vp.$notify.error("Lỗi đăng ký", message);
          }
        })
        .finally(() => {
          commit("purgeLoading");
        });
    });
  },
  async logout({ commit }) {
    setHeader();
    await logout();
    commit("purgeAuth");
  },
  async me({ commit }) {
    if (getToken()) {
      setHeader();
      const { data, status } = await me();
      if (data && status === 200) {
        commit("setAuth", data);
      }
    } else {
      commit("purgeAuth");
    }
  },
  async refresh({ commit }) {
    const { data, status } = await refresh();
    if (data && status === 200) {
      commit("setAuth", data);
    }
  },
  async forgotPassword({ commit }, payload) {
    try {
      commit("setLoading");
      const { data, status } = await forgotPassword(payload);
      if (data && status === 200) {
        commit("purgeLoading");
        vp.$notify.success("Forgot password", data.message);
      }
    } catch ({ response }) {
      if (response) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },
  async resetPassword({ commit }, payload) {
    try {
      commit("setLoading");
      const { data, status } = await resetPassword(payload);
      if (data && status === 200) {
        commit("purgeLoading");
        vp.$notify.success("Reset password", data.message);
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  }
};
const mutations = {
  setLoading(state) {
    state.loading = true;
  },
  purgeLoading(state) {
    state.loading = false;
  },
  setAuth(state, data) {
    state.loading = true;
    state.loggedIn = false;
    state.user = data.user;
    saveToken(data.__auth);
  },
  purgeAuth(state) {
    state.loggedIn = false;
    state.user = null;
    destroyToken();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
