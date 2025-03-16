import { create } from "zustand";
import axiosInstance from "../libs/axios";
import { toast } from "react-hot-toast";

const useUserStore = create((set) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    // ✅ Đăng ký tài khoản
    signUp: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error(`Passwords don't match`);
        }

        try {
            const res = await axiosInstance.post("/auth/signup", {
                name,
                email,
                password,
            });

            set({ user: res.data, loading: false });
            localStorage.setItem("token", res.data.token); // Lưu token
            axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.token}`;
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            set({ loading: false });
        }
    },

    // ✅ Đăng nhập
    login: async ({ email, password }) => {
        set({ loading: true });

        try {
            const res = await axiosInstance.post("/auth/login", {
                email,
                password,
            });

            set({ user: res.data, loading: false });
            localStorage.setItem("token", res.data.token); // Lưu token
            axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.token}`;
            toast.success("Login successful!");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            set({ loading: false });
        }
    },

    // ✅ Đăng xuất
    logout: () => {
        localStorage.removeItem("token"); // Xóa token khỏi localStorage
        set({ user: null });
        axiosInstance.defaults.headers.Authorization = null;
        toast.success("Logged out successfully!");
        window.location.href = "/login"; // Chuyển về trang đăng nhập
    },

    // ✅ Kiểm tra phiên đăng nhập
    checkAuth: async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            set({ user: null, checkingAuth: false });
            return;
        }

        set({ checkingAuth: true });
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

        try {
            const res = await axiosInstance.get("/auth/profile");
            set({ user: res.data });
        } catch (error) {
            console.error(
                "Không thể xác thực:",
                error.response?.data?.message || "Lỗi không xác định"
            );
            localStorage.removeItem("token");
            set({ user: null });
        } finally {
            set({ checkingAuth: false });
        }
    },

    // ✅ Làm mới token (Refresh Token)
    refreshToken: async () => {
        try {
            const res = await axiosInstance.post("/auth/refresh");
            localStorage.setItem("token", res.data.token); // Lưu lại token mới
            axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.token}`;
            return res.data.token;
        } catch (error) {
            console.error("Failed to refresh token:", error);
            localStorage.removeItem("token");
            set({ user: null });
            return null;
        }
    },
}));

export default useUserStore;
