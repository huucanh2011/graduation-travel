import {
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback
} from "@/api/Feedback";
import { vp } from "@/helpers/tools";

const state = {
  feedbacks: [],
  loading: false
};

const getters = {
  feedbacks: state => {
    return state.feedbacks;
  },
  getFeedbackById(state) {
    return feedbackId => {
      return state.feedbacks.find(feedback => {
        return feedback.id === feedbackId;
      });
    };
  },
  loading: state => {
    return state.loading;
  }
};

const actions = {
  async fetchFeedbacks({ commit }, payload) {
    let url = "feedbacks";

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
      getFeedbacks(url)
        .then(resp => {
          if (resp && resp.status === 200) {
            commit("fetchFeedbacks", resp.data.data);
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

  async createFeedback({ commit }, payload) {
    try {
      const { data, status } = await createFeedback(payload);
      if (data && status === 201) {
        commit("createFeedback", data);
        vp.$notify.success("Success", "Thêm thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async updateFeedback({ commit }, payload) {
    try {
      const { data, status } = await updateFeedback(payload.id, payload.values);
      if (data && status === 202) {
        commit("updateFeedback", data);
        vp.$notify.success("Success", "Cập nhật thành công");
      }
    } catch ({ response }) {
      if (response && response.status === 422) {
        const message = Object.values(response.data.message)[0];
        vp.$notify.error("Error", message);
      }
    }
  },

  async deleteFeedback({ commit }, id) {
    try {
      const { data, status } = await deleteFeedback(id);
      if (data && status === 200) {
        commit("deleteFeedback", id);
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
  fetchFeedbacks(state, data) {
    state.feedbacks = data;
  },
  createFeedback(state, data) {
    state.feedbacks.unshift(data);
    state.roles.pop();
  },
  updateFeedback(state, data) {
    const index = state.feedbacks.findIndex(item => item.id === data.id);
    state.feedbacks.splice(index, 1, data);
  },
  deleteFeedback(state, id) {
    const index = state.feedbacks.findIndex(item => item.id === id);
    state.feedbacks.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
