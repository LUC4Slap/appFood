const api = 'http://192.168.0.10:3002/api/treinafood/';

export const ApiService = {
  get(endpoint) {
    return fetch(`${api}${endpoint}`).then((response) => response.json());
  },
  post(endpoint, data) {
    return fetch(`${api}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },
};
