import { getRoles, createRole, updateRole, deleteRole } from "@/api/Role";
import { vp } from "@/helpers/tools";

const state = {
  roles: [],
  loading: false
};

const getters = {
  roles(state) {
    return state.roles;
  },
  getRoleById(state) {
    return roleId => {
      return state.roles.find(role => {
        return role.id === roleId;
      });
    };
  },
  loading(state) {
    return state.loading;
  }
};

const actions = {
  async fetchRoles({ commit }, payload) {
    let url = "roles";

    if (payload.page) url += `?page=${payload.page}`;
    if (payload.pageSize) url += `&pageSize=${payload.pageSize}`;
    if (payload.q) url += `&q=${payload.q}`;
    if (payload.sortBy && payload.orderBy) url += `&sortBy=${payload.sortBy}&orderBy=${payload.orderBy}`;

    return new Promise((reslove, reject) => {
      commit("setLoading", true);
      getRoles(url)
        .then(resp => {
          if (resp.data && resp.status === 200) {
            commit("fetchRoles", resp.data.data);
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

  async createRole({ commit }, payload) {
    try {
      const { data, status } = await createRole(payload);
      if (data && status === 201) {
        commit("createRole", data);
        vp.$notify.success("Success", "Thêm thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async updateRole({ commit }, payload) {
    try {
      const { data, status } = await updateRole(payload.id, payload.values);
      if (data && status === 202) {
        commit("updateRole", data);
        vp.$notify.success("Success", "Cập nhật thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async deleteRole({ commit }, id) {
    try {
      const { data, status } = await deleteRole(id);
      if (data && status === 200) {
        commit("deleteRole", id);
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
  createRole(state, data) {
    state.roles.unshitf(data);
    state.roles.pop();
  },
  updateRole(state, data) {
    const index = state.roles.findIndex(item => item.id === data.id);
    state.roles.splice(index, 1, data);
  },
  deleteRole(state, id) {
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
