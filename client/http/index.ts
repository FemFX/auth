import axios from "axios";

export const API_URL: string = "http://localhost:4000";

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  config!.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    console.log("errr");

    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      const response = await axios.get(`${API_URL}/refresh_token`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      return $api.request(originalRequest);
    }
    throw error;
  }
);

export default $api;
