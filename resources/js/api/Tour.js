export function getTours(query) {
  return axios.get(query);
}

export function createTour(payload) {
  return axios.post(`tours`, { tour_name: payload.tour_name });
}

export function updateTour(id, payload) {
  return axios.put(`tours/${id}`, { tour_name: payload.tour_name });
}

// export function updateActiveTour(id, payload) {
//   return axios.put(`tours/${id}`, { Tour_name: payload.Tour_name });
// }

export function deleteTour(id) {
  return axios.delete(`tours/${id}`);
}
