import { getPermissions, updatePermission, getRoles } from "@/api/Permission";
import { vp } from "@/helpers/tools";

const state = {
  roles: [],
  permissions: [],
  loading: false
};

const getters = {
  roles: state => {
    return state.roles;
  },
  permissions: state => {
    return state.permissions;
  },
  loading: state => {
    return state.loading;
  }
};

const actions = {
  async fetchPermissions({ commit }, payload) {
    let url = "permissions";

    if (payload.page) url += `?page=${payload.page}`;
    if (payload.pageSize) url += `&pageSize=${payload.pageSize}`;
    if (payload.q) url += `&q=${payload.q}`;
    if (payload.sortBy && payload.orderBy) url += `&sortBy=${payload.sortBy}&orderBy=${payload.orderBy}`;

    return new Promise((reslove, reject) => {
      commit("setLoading", true);
      getPermissions(url)
        .then(resp => {
          if (resp && resp.status === 200) {
            commit("fetchPermissions", resp.data.data);
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

  async fetchRoles({ commit }) {
    try {
      const { data, status } = await getRoles();
      if (data && status === 200) {
        commit("fetchRoles", data.data);
      }
    } catch ({ response }) {
      console.log(response.data);
    }
  },

  async updatePermission({ commit }, payload) {
    try {
      const { data, status } = await updatePermission(payload.id, payload.values);
      if (data && status === 202) {
        commit("updatePermission", data);
        vp.$notify.success("Success", "Cập nhật thành công");
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
  setLoading(state, data) {
    state.loading = data;
  },
  fetchPermissions(state, data) {
    state.permissions = data;
  },
  fetchRoles(state, data) {
    state.roles = data;
  },
  updatePermission(state, data) {
    const index = state.permissions.findIndex(item => item.id === data.id);
    state.permissions.splice(index, 1, data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
