export function getSlides(query) {
  return axios.get(query);
}

export function createSlide(payload) {
  return axios.post(`slides`, {
    title: payload.title,
    description: payload.description,
    image: payload.image,
    link: payload.link,
    is_active: payload.is_active
  });
}

export function updateSlide(id, payload) {
  return axios.put(`slides/${id}`, {
    title: payload.title,
    description: payload.description,
    image: payload.image,
    link: payload.link,
    is_active: payload.is_active
  });
}

export function updateActiveSlide(id, payload) {
  return axios.put(`update-active-slide/${id}`, {
    is_active: payload.is_active
  });
}

export function deleteSlide(id) {
  return axios.delete(`slides/${id}`);
}
