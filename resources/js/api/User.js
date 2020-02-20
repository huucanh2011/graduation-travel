export function getUsers(query) {
  return axios.get(query);
}

export function createUser(payload) {
  return axios.post(`users`, {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    phone_number: payload.phone_number,
    address: payload.address,
    is_active: payload.is_active,
    role_id: payload.role_id
  });
}

export function updateUser(id, payload) {
  return axios.put(`users/${id}`, {
    name: payload.name,
    phone_number: payload.phone_number,
    address: payload.address,
    is_active: payload.is_active,
    role_id: payload.role_id
  });
}

export function updateActiveUser(id, payload) {
  return axios.put(`update-active-user/${id}`, {
    is_active: payload.is_active
  });
}

export function deleteUser(id) {
  return axios.delete(`users/${id}`);
}
