export function getRoles(query) {
  return axios.get(query);
}

export function createRole(payload) {
  return axios.post(`roles`, { role_name: payload.role_name });
}

export function updateRole(id, payload) {
  return axios.put(`roles/${id}`, { role_name: payload.role_name });
}

export function deleteRole(id) {
  return axios.delete(`roles/${id}`);
}
