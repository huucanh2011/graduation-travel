const callerApi = {
  getAll(endpoint) {
    return axios.get(endpoint);
  },

  getOne(endpoint, id) {
    return axios.get(`${endpoint}/${id}`);
  },

  create(endpoint, payload) {
    return axios.post(`${endpoint}`, payload);
  },

  update(endpoint, payload, id) {
    return axios.patch(`${endpoint}/${id}`, payload);
  },

  delete(endpoint, id) {
    return axios.delete(`${endpoint}/${id}`);
  }
};

export default callerApi;
