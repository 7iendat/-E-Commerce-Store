import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import axiosInstance from "../libs/axios";
import useCartStore from "../stores/useCartStore";

const ProductDetailPage = () => {
    const { productId } = useParams(); // Lấy ID sản phẩm từ URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCartStore(); // Dùng Zustand để thêm vào giỏ hàng

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosInstance.get(`/products/${productId}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <p className="text-center text-white">Đang tải...</p>;
    if (!product)
        return (
            <p className="text-center text-red-500">Không tìm thấy sản phẩm</p>
        );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Phần ảnh sản phẩm */}
                <div className="flex justify-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full max-w-md object-cover rounded-lg shadow-2xl transition-shadow duration-300"
                    />
                </div>

                {/* Phần thông tin sản phẩm */}
                <div className="text-white">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-emerald-400 text-2xl font-semibold mt-4">
                        {product.price.toLocaleString("vi-VN")} VND
                    </p>
                    <p className="mt-4 text-gray-300">{product.description}</p>

                    {/* Nút thêm vào giỏ */}
                    <button
                        className="mt-6 flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg transition"
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
