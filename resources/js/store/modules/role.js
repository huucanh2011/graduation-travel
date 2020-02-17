import ApiService from "@/api/api.service";
import { vp, isNotNull } from "@/helpers/tools";

const state = {
  dataCache: {},
  roles: [],
  isLoading: false
};

const getters = {
  dataCache: state => {
    return state.dataCache;
  },
  roles: state => {
    return state.roles;
  },
  isLoading: state => {
    return state.isLoading;
  }
};

const actions = {
  async FETCH_ROLES({ commit }, payload) {
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
      ApiService.query(`roles?${url}`)
        .then(resp => {
          if (resp && resp.status === 200) {
            commit("FETCH_ROLES", resp.data.data);
            reslove(resp);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  async CREATE_ROLE({ commit }, payload) {
    try {
      let role = {
        role_name: payload.role_name
      };
      const resp = await ApiService.post("roles", role);
      if (resp && resp.status === 201) {
        commit("CREATE_ROLE", resp.data);
        vp.$notify.success("Success", "Thêm thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async UPDATE_ROLE({ commit }, payload) {
    try {
      const resp = await ApiService.update("roles", payload.values, payload.id);
      if (resp && resp.status === 202) {
        commit("UPDATE_ROLE", resp.data);
        vp.$notify.success("Success", "Cập nhật thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async GET_ROLE({ commit }, id) {
    try {
      const resp = await ApiService.get("roles", id);
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

  async DELETE_ROLE({ commit }, id) {
    try {
      const resp = await ApiService.delete("roles", id);
      if (resp && resp.status === 200) {
        commit("DELETE_ROLE", id);
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
  FETCH_ROLES(state, data) {
    state.roles = data;
    state.isLoading = false;
  },
  CREATE_ROLE(state, data) {
    state.roles.unshift(data);
  },
  UPDATE_ROLE(state, data) {
    const index = state.roles.findIndex(item => item.id === data.id);
    state.roles.splice(index, 1, data);
  },
  DELETE_ROLE(state, id) {
    const index = state.roles.findIndex(item => item.id === id);
    state.roles.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
