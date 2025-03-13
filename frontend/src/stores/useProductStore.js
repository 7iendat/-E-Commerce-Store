import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../libs/axios";

console.log("check", axiosInstance.getUri());

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post(
        "/products/create-product",
        productData
      );
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Create a product successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
      set({ loading: false });
    }
  },
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/products");
      set({ products: res.data.products, loading: false });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch products");
      set({ error: "Failed to fetch products", loading: false });
    }
  },
  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/products/category/${category}`);
      set({ products: res.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to get products", loading: false });
      toast.error(error.response.data.message || "Failed to get products");
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.filter((p) => p._id !== productId),
        loading: false,
      }));
      toast.success("Deleted product successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Failed to delete product");
    }
  },
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.patch(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.map((p) =>
          p._id === productId ? { ...p, isFeatured: res.data.isFeatured } : p
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Failed to update product");
    }
  },
}));

export default useProductStore;
