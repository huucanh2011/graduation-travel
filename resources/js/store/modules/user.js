import ApiService from "@/api/api.service";
import { vp, isNotNull } from "@/helpers/tools";

const state = {
  dataCache: {},
  roles: [],
  users: [],
  isLoading: false
};

const getters = {
  dataCache: state => {
    return state.dataCache;
  },
  roles: state => {
    return state.roles;
  },
  users: state => {
    return state.users;
  },
  isLoading: state => {
    return state.isLoading;
  }
};

const actions = {
  async FETCH_ROLES({ commit }) {
    const { data } = await ApiService.get("roles");
    commit("FETCH_ROLE", data.data);
    // console.log(data);
  },
  async FETCH_USERS({ commit }, payload) {
    let url = `page=${payload.page}`,
      keyword = payload.params.keyword,
      sortBy = payload.params.sortBy,
      orderBy = payload.params.orderBy;

    if (isNotNull(keyword)) {
      url += `&keyword=${keyword}`;
    }

    if (isNotNull(sortBy) && isNotNull(orderBy)) {
      url += `&sortBy=${sortBy}&orderBy=${orderBy}`;
    }

    return new Promise((reslove, reject) => {
      commit("SET_LOADING");
      ApiService.query(`users?${url}`)
        .then(resp => {
          if (resp && resp.status === 200) {
            commit("FETCH_USER", resp.data.data);
            reslove(resp);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  async CREATE_USER({ commit }, payload) {
    try {
      let user = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone_number: payload.phone_number,
        address: payload.address,
        is_active: payload.is_active,
        role_id: payload.role_id
      };
      const resp = await ApiService.post("users", user);
      if (resp && resp.status === 201) {
        commit("CREATE_USER", resp.data);
        vp.$notify.success("Success", "Thêm thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async UPDATE_USER({ commit }, payload) {
    try {
      const resp = await ApiService.update("users", payload.values, payload.id);
      if (resp && resp.status === 202) {
        commit("UPDATE_USER", resp.data);
        vp.$notify.success("Success", "Cập nhật thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async GET_USER({ commit }, id) {
    try {
      const resp = await ApiService.get("users", id);
      if (resp && resp.status === 200) {
        commit("SET_CACHE", resp.data);
      }
    } catch ({ response }) {
      if (response && response.status === 404) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  CLEAN_CACHE({ commit }) {
    commit("CLEAN_CACHE");
  },

  async DELETE_USER({ commit }, id) {
    try {
      const resp = await ApiService.delete("users", id);
      if (resp && resp.status === 200) {
        commit("DELETE_USER", id);
        vp.$notify.success("Success", resp.data.message);
      }
    } catch ({ response }) {
      if (response) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  }
};

const mutations = {
  SET_LOADING(state) {
    state.isLoading = true;
  },
  SET_CACHE(state, data) {
    state.dataCache = data;
  },
  CLEAN_CACHE(state) {
    state.dataCache = {};
  },
  FETCH_ROLE(state, data) {
    state.roles = data;
  },
  FETCH_USER(state, data) {
    state.users = data;
    state.isLoading = false;
  },
  CREATE_USER(state, data) {
    state.users.unshift(data);
  },
  UPDATE_USER(state, data) {
    const index = state.users.findIndex(item => item.id === data.id);
    state.users.splice(index, 1, data);
  },
  DELETE_USER(state, id) {
    const index = state.users.findIndex(item => item.id === id);
    state.users.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
