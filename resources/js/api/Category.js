export function getCategories(query) {
  return axios.get(query);
}

export function createCategory(payload) {
  return axios.post(`categories`, { cate_name: payload.cate_name });
}

export function updateCategory(id, payload) {
  return axios.put(`categories/${id}`, { cate_name: payload.cate_name });
}

export function deleteCategory(id) {
  return axios.delete(`categories/${id}`);
}
