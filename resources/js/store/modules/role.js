import CallerApi from "@/helpers/callerapi";

const state = {
  roleEdit: {},
  roles: [],
  isLoading: false
};

const getters = {
  roleEdit: state => {
    return state.roleEdit;
  },
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
      const role = {
        role_name: payload.role_name
      };
      const resp = await CallerApi.create("roles", role);
      if (resp && resp.status === 201) {
        commit("CREATE_ROLE", resp.data);
        notification.success({
          message: "Success",
          description: "Thêm thành công"
        });
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        notification.error({
          message: "Errors",
          description: Object.values(response.data.message)[0]
        });
      }
    }
  },

  async UPDATE_ROLE({ commit, state }, payload) {
    if (payload.values.role_name === state.roleEdit.role_name) {
      notification.error({
        message: "Errors",
        description: "Bạn không thay đổi gì"
      });

      return;
    }
    try {
      const resp = await CallerApi.update("roles", payload.values, payload.id);
      if (resp && resp.status === 202) {
        commit("UPDATE_ROLE", resp.data);
        notification.success({
          message: "Success",
          description: "Cập nhật thành công"
        });
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        notification.error({
          message: "Errors",
          description: Object.values(response.data.message)[0]
        });
      }
    }
  },

  async GET_ROLE({ commit }, id) {
    return new Promise((reslove, reject) => {
      CallerApi.getOne("roles", id)
        .then(resp => {
          commit("SET_ROLE", resp.data);
          reslove(resp);
        })
        .catch(err => {
          if (err.response) {
            notification.error({
              message: "Errors",
              description: Object.values(err.response.data.message)[0]
            });
          }
          reject(error);
        });
    });
  },

  CLEAR_ROLE({ commit }) {
    commit("CLEAR_ROLE");
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
    } catch ({ response }) {
      if (response) {
        notification.error({
          message: "Errors",
          description: Object.values(response.data.message)[0]
        });
      }
    }
  }
};

const mutations = {
  SET_LOADING(state) {
    state.isLoading = true;
  },
  SET_ROLE(state, data) {
    state.roleEdit = data;
  },
  CLEAR_ROLE(state) {
    state.roleEdit = {};
  },
  FETCH_ROLES(state, data) {
    state.roles = data;
    state.isLoading = false;
  },
  CREATE_ROLE(state, data) {
    state.roles.push(data);
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
