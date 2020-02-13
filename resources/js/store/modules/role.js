import CallerApi from "@/helpers/callerapi";

const state = {
  roles: [],
  isLoading: false
};

const getters = {
  roles: state => {
    return state.roles;
  },
  isLoading: state => {
    return state.isLoading;
  }
};

const actions = {
  async FETCH_ROLES({ commit }, page) {
    return new Promise((reslove, reject) => {
      commit("SET_LOADING");
      CallerApi.getAll(`roles?page=${page}`)
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
      const resp = await CallerApi.create("roles", payload);
      if (resp && resp.status === 201) {
        commit("CREATE_ROLE", resp.data);
        notification.success({
          message: "Success",
          description: "Thêm thành công"
        });
      }
    } catch ({ response }) {
      if (response && response.data.status_code === 422) {
        notification.error({
          message: "Errors",
          description: Object.values(response.data.errors)[0]
        });
      }
    }
  },

  async DELETE_ROLE({ commit }, id) {
    try {
      const resp = await CallerApi.delete("roles", id);
      if (resp && resp.status === 200) {
        commit("DELETE_ROLE", id);
        notification.success({
          message: "Success",
          description: "Xóa thành công"
        });
      }
    } catch (error) {
      throw new Error(JSON.parse(error.response.data));
    }
  }
};

const mutations = {
  SET_LOADING(state) {
    state.isLoading = true;
  },
  FETCH_ROLES(state, data) {
    state.roles = data;
    state.isLoading = false;
  },
  CREATE_ROLE(state, data) {
    state.roles.push(data);
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
