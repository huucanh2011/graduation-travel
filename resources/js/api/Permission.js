export function getPermissions(query) {
  return axios.get(query);
}

export function updatePermission(id, payload) {
  return axios.put(`permissions/${id}`, payload);
}

export function getRoles() {
  return axios.get(`get-roles`);
}
