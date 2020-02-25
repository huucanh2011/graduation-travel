export function register(payload) {
  return axios.post(`auth/register`, {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role_slug: payload.role_slug
  });
}

export function login(payload) {
  return axios.post(`auth/login`, {
    email: payload.email,
    password: payload.password
  });
}

export function logout() {
  return axios.get(`auth/logout`).then(() => {
    window.location.replace("/");
  });
}

export function refresh() {
  return axios.post(`auth/refresh`);
}

export function me() {
  return axios.get(`auth/me`);
}

export function forgotPassword(payload) {
  return axios.post(`auth/forgotpassword`, { email: payload.email });
}

export function resetPassword(payload) {
  return axios.put(`auth/resetpassword`, {
    email: payload.email,
    password: payload.password,
    resetToken: payload.resetToken
  });
}

export function loginSocialAccount(provider) {
  return axios.get(`auth/${provider}`);
}
