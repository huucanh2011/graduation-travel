const ApiService = {
  query(resource) {
    return axios.get(resource).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  get(resource, id = "") {
    return axios.get(`${resource}/${id}`).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  post(resource, payload) {
    return axios.post(`${resource}`, payload);
  },

  update(resource, payload, id) {
    return axios.patch(`${resource}/${id}`, payload);
  },

  put(resource, payload) {
    return axios.put(`${resource}`, payload);
  },

  delete(resource, id) {
    return axios.delete(`${resource}/${id}`).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  }
};

export default ApiService;
