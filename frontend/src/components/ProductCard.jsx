import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router"; // Import useNavigate
import useUserStore from "../stores/useUserStore";
import toast from "react-hot-toast";
import useCartStore from "../stores/useCartStore";

const ProductCard = ({ product }) => {
    const navigate = useNavigate(); // Hook điều hướng
    const { user } = useUserStore();
    const { addToCart } = useCartStore();
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async (e) => {
        e.stopPropagation(); // Ngăn chặn chuyển hướng khi click vào nút giỏ hàng

        if (!user) {
            toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ!", {
                id: "login",
            });
            return;
        }

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500)); // Giả lập loading
        addToCart(product);
        setLoading(false);
    };

    return (
        <div
            className="relative flex flex-col w-full overflow-hidden rounded-lg border border-gray-700 shadow-lg transition-transform hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/products/${product._id}`)} // Điều hướng khi click
        >
            {/* Hình ảnh */}
            <div className="relative mx-3 mt-3 h-60 overflow-hidden rounded-xl">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="px-5 pb-5 mt-4">
                <h5 className="text-lg font-semibold text-white truncate">
                    {product.name}
                </h5>
                <p className="mt-2 text-3xl font-bold text-emerald-400">
                    {product.price.toLocaleString("vi-VN")} VND
                </p>

                {/* Nút Thêm vào giỏ */}
                <button
                    className={`mt-4 flex items-center justify-center w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white transition ${
                        loading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-300"
                    }`}
                    onClick={handleAddToCart}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="animate-spin mr-2">⏳</span>
                    ) : (
                        <ShoppingCart size={20} className="mr-2" />
                    )}
                    {loading ? "Đang thêm..." : "Thêm vào giỏ"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
