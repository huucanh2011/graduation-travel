import { getCategories, createCategory, updateCategory, deleteCategory } from "@/api/Category";
import { vp } from "@/helpers/tools";

const state = {
  categories: [],
  loading: false
};

const getters = {
  categories: state => {
    return state.categories;
  },
  getCategoryById(state) {
    return categoryId => {
      return state.categories.find(cate => {
        return cate.id === categoryId;
      });
    };
  },
  loading: state => {
    return state.loading;
  }
};

const actions = {
  async fetchCategories({ commit }, payload) {
    let url = "categories";

    if (payload.page) {
      url += `?page=${payload.page}`;
    }

    if (payload.q) {
      url += `&q=${payload.q}`;
    }

    if (payload.sortBy && payload.orderBy) {
      url += `&sortBy=${payload.sortBy}&orderBy=${payload.orderBy}`;
    }

    return new Promise((reslove, reject) => {
      commit("setLoading", true);
      getCategories(url)
        .then(resp => {
          if (resp && resp.status === 200) {
            commit("fetchCategories", resp.data.data);
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

  async createCategory({ commit }, payload) {
    try {
      const { data, status } = await createCategory(payload);
      if (data && status === 201) {
        commit("createCategory", data);
        vp.$notify.success("Success", "Thêm thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async updateCategory({ commit }, payload) {
    try {
      const { data, status } = await updateCategory(payload.id, payload.values);
      if (data && status === 202) {
        commit("updateCategory", data);
        vp.$notify.success("Success", "Cập nhật thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async deleteCategory({ commit }, id) {
    try {
      const { data, status } = await deleteCategory(id);
      if (data && status === 200) {
        commit("deleteCategory", id);
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
  fetchCategories(state, data) {
    state.categories = data;
  },
  createCategory(state, data) {
    state.categories.unshift(data);
    state.roles.pop();
  },
  updateCategory(state, data) {
    const index = state.categories.findIndex(item => item.id === data.id);
    state.categories.splice(index, 1, data);
  },
  deleteCategory(state, id) {
    const index = state.categories.findIndex(item => item.id === id);
    state.categories.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
