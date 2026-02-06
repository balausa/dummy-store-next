import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const { state } = JSON.parse(authStorage);
        if (state.user?.accessToken) {
          config.headers.Authorization = `Bearer ${state.user.accessToken}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const authStorage = localStorage.getItem('auth-storage');
        if (!authStorage) throw new Error('No auth storage');

        const parsedStorage = JSON.parse(authStorage);
        const refreshToken = parsedStorage.state.user?.refreshToken;

        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${axiosInstance.defaults.baseURL}/auth/refresh`, {
          refreshToken: refreshToken,
          expiresInMins: 60,
        });

        const updatedStorage = {
          ...parsedStorage,
          state: {
            ...parsedStorage.state,
            user: {
              ...parsedStorage.state.user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            },
          },
        };
        localStorage.setItem('auth-storage', JSON.stringify(updatedStorage));

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('auth-storage');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;