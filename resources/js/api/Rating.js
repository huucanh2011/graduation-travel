export function getRatings(query) {
  return axios.get(query);
}

export function createRating(payload) {
  return axios.post(`ratings`, {
    rating_scores: payload.rating_scores,
    rating_content: payload.rating_content,
    is_active: payload.is_active,
    user_id: payload.user_id,
    tour_id: payload.tour_id
  });
}

export function updateRating(id, payload) {
  return axios.put(`ratings/${id}`, { is_active: payload.is_active });
}

export function deleteRating(id) {
  return axios.delete(`ratings/${id}`);
}
