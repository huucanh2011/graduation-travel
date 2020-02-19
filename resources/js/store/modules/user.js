import { getUsers, createUser, updateUser, deleteUser } from "@/api/User";
import { getRoles } from "@/api/Permission";
import { vp } from "@/helpers/tools";

const state = {
  roles: [],
  users: [],
  loading: false
};

const getters = {
  roles: state => {
    return state.roles;
  },
  users: state => {
    return state.users;
  },
  getUserById(state) {
    return userId => {
      return state.users.find(user => {
        return user.id === userId;
      });
    };
  },
  loading(state) {
    return state.loading;
  }
};

const actions = {
  async fetchRoles({ commit }) {
    const { data, status } = await getRoles();
    if (data && status === 200) {
      commit("fetchRoles", data.data);
    }
  },
  async fetchUsers({ commit }, payload) {
    let url = "users";

    if (payload.page) {
      url += `?page=${payload.page}`;
    }

    if (payload.keyword) {
      url += `&keyword=${payload.keyword}`;
    }

    if (payload.sortBy && payload.orderBy) {
      url += `&sortBy=${payload.sortBy}&orderBy=${payload.orderBy}`;
    }

    return new Promise((reslove, reject) => {
      commit("setLoading", true);
      getUsers(url)
        .then(resp => {
          if (resp && resp.status === 200) {
            commit("fetchUsers", resp.data.data);
            reslove(resp);
          }
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    });
  },

  async createUser({ commit }, payload) {
    try {
      const { data, status } = await createUser(payload);
      if (data && status === 201) {
        commit("createUser", data);
        vp.$notify.success("Success", "Thêm thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async updateUser({ commit }, payload) {
    try {
      const { data, status } = await updateUser(payload.id, payload.values);
      if (data && status === 202) {
        commit("updateUser", data);
        vp.$notify.success("Success", "Cập nhật thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async deleteUser({ commit }, id) {
    try {
      const { data, status } = await deleteUser(id);
      if (data && status === 200) {
        commit("deleteUser", id);
        vp.$notify.success("Success", data.message);
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
  setLoading(state, data) {
    state.loading = data;
  },
  fetchRoles(state, data) {
    state.roles = data;
  },
  fetchUsers(state, data) {
    state.users = data;
  },
  createUser(state, data) {
    state.users.unshift(data);
    state.users.pop();
  },
  updateUser(state, data) {
    const index = state.users.findIndex(item => item.id === data.id);
    state.users.splice(index, 1, data);
  },
  deleteUser(state, id) {
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
