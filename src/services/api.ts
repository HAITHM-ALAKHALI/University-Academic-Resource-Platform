import axios from "axios";

// 1. إنشاء نسخة مخصصة من Axios
export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 2. Request Interceptor: إرفاق التوكن تلقائياً مع كل طلب يخرج من الفرونت
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 3. Response Interceptor: التعامل مع انتهاء صلاحية التوكن (401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    const isLoginRequest = requestUrl.includes("/login");

    if (status === 401 && !isLoginRequest) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      localStorage.removeItem("auth_user");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
