export function getPermissions(query) {
  return axios.get(query);
}

export function getRoles() {
  return axios.get(`get-roles`);
}

export function updatePermission(id, payload) {
  return axios.put(`permissions/${id}`, payload);
}
