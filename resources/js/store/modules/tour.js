import { getTours, createTour, updateTour, deleteTour } from "@/api/Tour";
import { vp } from "@/helpers/tools";

const state = {
  tours: [],
  loading: false
};

const getters = {
  tours(state) {
    return state.tours;
  },
  loading(state) {
    return state.loading;
  }
};

const actions = {
  async fetchTours({ commit }, payload) {
    let url = "tours";

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
      getTours(url)
        .then(resp => {
          if (resp.data && resp.status === 200) {
            commit("fetchTours", resp.data.data);
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

  async createTour({ commit }, payload) {
    try {
      const { data, status } = await createTour(payload);
      if (data && status === 201) {
        commit("createTour", data);
        vp.$notify.success("Success", "Thêm thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async updateTour({ commit }, payload) {
    try {
      const { data, status } = await updateTour(payload.id, payload.values);
      if (data && status === 202) {
        commit("updateTour", data);
        vp.$notify.success("Success", "Cập nhật thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async deleteTour({ commit }, id) {
    try {
      const { data, status } = await deleteTour(id);
      if (data && status === 200) {
        commit("deleteTour", id);
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
  fetchTours(state, data) {
    state.tours = data;
  },
  createTour(state, data) {
    state.tours.unshitf(data);
    state.tours.pop();
  },
  updateTour(state, data) {
    const index = state.tours.findIndex(item => item.id === data.id);
    state.tours.splice(index, 1, data);
  },
  deleteTour(state, id) {
    const index = state.tours.findIndex(item => item.id === id);
    state.tours.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
