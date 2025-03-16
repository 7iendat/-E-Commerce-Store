import { create } from "zustand";
import axiosInstance from "../libs/axios";
import { toast } from "react-hot-toast";

const useUserStore = create((set, get) => ({
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
            toast.success("Login successful!");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            set({ loading: false });
        }
    },

    // ✅ Đăng xuất
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }

        set({ user: null });
        localStorage.removeItem("token"); // Xóa token khỏi localStorage
        toast.success("Logged out successfully!");
    },

    // ✅ Kiểm tra phiên đăng nhập
    checkAuth: async () => {
        set({ checkingAuth: true });

        try {
            const res = await axiosInstance.get("/auth/profile");
            set({ user: res.data });
        } catch (error) {
            console.error(error.response?.data?.message || "An error occurred");
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
            return res.data.token;
        } catch (error) {
            console.error("Failed to refresh token:", error);
            get().logout(); // Nếu refresh thất bại, đăng xuất
            throw error;
        }
    },
}));

export default useUserStore;
