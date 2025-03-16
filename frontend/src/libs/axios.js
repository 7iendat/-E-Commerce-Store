import axios from "axios";
import useUserStore from "../stores/useUserStore";

const axiosInstance = axios.create({
    baseURL:
        import.meta.env.MODE === "development"
            ? "http://localhost:5000/api"
            : "/api",
    withCredentials: true,
});

// Biến flag để tránh vòng lặp vô tận khi refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });

    failedQueue = [];
};

// Interceptor để tự động refresh token nếu gặp lỗi 401
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const userStore = useUserStore.getState();

        // Nếu lỗi 401 (Unauthorized) và chưa thử lại
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers[
                            "Authorization"
                        ] = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await userStore.refreshToken();
                if (!newToken) throw new Error("Token refresh failed");

                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${newToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

                processQueue(null, newToken);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                userStore.logout(); // Nếu refresh thất bại, đăng xuất
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
