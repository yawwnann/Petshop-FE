import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error Interceptor:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error("Response Error Interceptor:", error.response || error);

    if (error.response) {
      if (error.response.status === 401) {
        console.log("Unauthorized (401)! Token expired or invalid.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");

        if (window.location.pathname !== "/login") {
          alert("Sesi Anda telah berakhir. Silakan login kembali.");
          window.location.href = "/login";
        }
      } else if (error.response.status === 403) {
        console.log("Forbidden (403)! Access denied.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");

        if (window.location.pathname !== "/login") {
          alert("Akses ditolak. Silakan login kembali.");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
