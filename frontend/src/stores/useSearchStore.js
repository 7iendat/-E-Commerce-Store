import { create } from "zustand";
import axiosInstance from "../libs/axios";

const useSearchStore = create((set) => ({
    isOpen: false,
    searchQuery: "",
    results: [],
    setResults: (newResults) => set({ results: newResults }),

    openSearch: () => {
        document.body.classList.add("overflow-hidden"); // Ngăn scroll
        set({ isOpen: true });
    },

    closeSearch: () => {
        document.body.classList.remove("overflow-hidden"); // Cho phép scroll lại
        set({ isOpen: false, searchQuery: "", results: [] });
    },

    setSearchQuery: async (query) => {
        set({ searchQuery: query });

        if (query.trim() === "") {
            set({ results: [] });
            return;
        }

        try {
            const response = await axiosInstance.get(
                `/products?search=${query}`
            );
            set({
                results: Array.isArray(response.data.products)
                    ? response.data.products
                    : [],
            });
        } catch (error) {
            console.error("Lỗi khi tìm kiếm sản phẩm:", error);
            set({ results: [] });
        }
    },
}));

export default useSearchStore;
