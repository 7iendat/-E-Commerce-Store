import { create } from "zustand";
import axiosInstance from "../libs/axios";
import toast from "react-hot-toast";

const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,

    getMyCoupon: async () => {
        try {
            const res = await axiosInstance.get("/coupons");
            set({ coupon: res.data });
        } catch (error) {
            console.error("Error fetching coupon", error);
        }
    },
    applyCoupon: async (code) => {
        try {
            const res = await axiosInstance.post("/coupons/validate", { code });
            set({ coupon: res.data, isCouponApplied: true });
            get().calculateTotals();
            toast.success("Coupon applied successfully!");
        } catch (error) {
            toast.error(
                error.response.data.message || "Failed to apply coupon"
            );
        }
    },

    removeCoupon: async () => {
        set({ coupon: null, isCouponApplied: false });
        get().calculateTotals();
        toast.success("Coupon removed");
    },

    getCartItems: async () => {
        try {
            const res = await axiosInstance.get("/cart");
            set({ cart: res.data });
            get().calculateTotals();
        } catch (error) {
            set({ cart: [] });
            toast.error(error.response.data.message || "An error occurred");
            console.log("An error occurred");
        }
    },

    addToCart: async (product) => {
        try {
            await axiosInstance.post("/cart", { productId: product._id });
            toast.success("Đã thêm vào giỏ hàng!");

            set((prevState) => {
                const existingItems = prevState.cart.find(
                    (i) => i._id === product._id
                );
                const newCart = existingItems
                    ? prevState.cart.map((item) =>
                          item._id === product._id
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                      )
                    : [...prevState.cart, { ...product, quantity: 1 }];
                return { cart: newCart };
            });

            get().calculateTotals();
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
        }
    },

    calculateTotals: () => {
        const { cart, coupon } = get();

        const subTotal = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        let total = subTotal;
        if (coupon) {
            const discount = subTotal * (coupon.discountPercentage / 100);
            total = subTotal - discount;
        }

        set({ subTotal, total });
    },

    removeFromCart: async (productId) => {
        try {
            await axiosInstance.delete(`/cart`, { data: { productId } });
            set((prevState) => ({
                cart: prevState.cart.filter((i) => i._id !== productId),
            }));
            get().calculateTotals();
            toast.success("Deleted product success");
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
        }
    },

    updateQuantity: async (productId, quantity) => {
        if (quantity === 0) {
            get().removeFromCart(productId);
            return;
        }

        await axiosInstance.put(`/cart/${productId}`, { quantity });
        set((prevState) => ({
            cart: prevState.cart.map((i) =>
                i._id === productId ? { ...i, quantity } : i
            ),
        }));

        get().calculateTotals();
    },

    clearCart: async () => {
        set({ cart: [], coupon: null, total: 0, subTotal: 0 });
    },
}));

export default useCartStore;
