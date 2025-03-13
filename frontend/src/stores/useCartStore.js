import { create } from "zustand";
import axiosInstance from "../libs/axios";
import toast from "react-hot-toast";

const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,

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
            toast.success("Product added to cart");

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
}));

export default useCartStore;
