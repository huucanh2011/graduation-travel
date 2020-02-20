const AUTH_TOKEN = "__auth";

const getToken = () => {
  return window.localStorage.getItem(AUTH_TOKEN);
};

const saveToken = token => {
  window.localStorage.setItem(AUTH_TOKEN, token);
};

const destroyToken = () => {
  window.localStorage.removeItem(AUTH_TOKEN);
};

export { getToken, saveToken, destroyToken };
