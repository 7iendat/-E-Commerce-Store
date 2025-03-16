import axios from "axios";
import useUserStore from "../stores/useUserStore";

const axiosInstance = axios.create({
    baseURL:
        import.meta.mode === "development"
            ? "http://localhost:5000/api"
            : "/api",
    withCredentials: true,
});

// Interceptor để tự động refresh token nếu gặp lỗi 401
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 (Unauthorized) và chưa thử lại
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await useUserStore.getState().refreshToken();
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${newToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                useUserStore.getState().logout(); // Nếu refresh thất bại, đăng xuất
                window.location.href = "/login"; // Chuyển về trang đăng nhập
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
