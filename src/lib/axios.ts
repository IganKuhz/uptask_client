import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
api.interceptors.request.use(config => {
	const authToken = localStorage.getItem('AuthToken');
	if (authToken) {
		config.headers.Authorization = `Bearer ${authToken}`;
	}
	return config;
});

export default api;
