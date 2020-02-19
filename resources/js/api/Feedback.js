export function getFeedbacks(query) {
  return axios.get(query);
}

export function createFeedback(payload) {
  return axios.post(`feedbacks`, {
    name: payload.name,
    email: payload.email,
    phone_number: payload.phone_number,
    subject: payload.subject,
    content: payload.content
  });
}

export function updateFeedback(id, payload) {
  return axios.put(`feedbacks/${id}`, { seen: payload.seen });
}

export function deleteFeedback(id) {
  return axios.delete(`feedbacks/${id}`);
}
