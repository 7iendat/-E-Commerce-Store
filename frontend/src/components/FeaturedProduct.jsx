import React, { useEffect, useState } from "react";
import useCartStore from "../stores/useCartStore";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import toast from "react-hot-toast";

const FeaturedProduct = ({ featuredProducts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 640) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else if (window.innerWidth < 1280) setItemsPerPage(3);
            else setItemsPerPage(4);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    };

    const { user } = useUserStore();
    const { addToCart } = useCartStore();
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async (e, product) => {
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

    const isStartDisabled = currentIndex === 0;
    const isEndDisabled =
        currentIndex >= featuredProducts.length - itemsPerPage;

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
                    Sản phẩm đặc trưng
                </h2>
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `translateX(-${
                                    currentIndex * (100 / itemsPerPage)
                                }%)`,
                            }}
                        >
                            {featuredProducts?.map((product) => (
                                <div
                                    onClick={() =>
                                        navigate(`/products/${product._id}`)
                                    }
                                    key={product._id}
                                    className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
                                >
                                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-emerald-500/30">
                                        {/* Hình ảnh */}
                                        <div className="overflow-hidden">
                                            <img
                                                src={product.image}
                                                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                            />
                                        </div>

                                        {/* Nội dung */}
                                        <div className="p-4">
                                            {/* Tên sản phẩm */}
                                            <div className="relative group">
                                                <h3 className="text-lg font-semibold text-white mb-2 truncate">
                                                    {product.name}
                                                </h3>

                                                {/* Tooltip khi hover vào tên sản phẩm */}
                                                <div className="absolute hidden group-hover:flex w-max max-w-xs bg-black text-white text-sm p-2 rounded-lg shadow-md -top-10 left-1/2 transform -translate-x-1/2">
                                                    {product.name}
                                                </div>
                                            </div>

                                            {/* Giá tiền */}
                                            <p className="text-emerald-300 font-medium mb-4">
                                                {product.price?.toLocaleString(
                                                    "vi-VN"
                                                )}
                                                VND
                                            </p>

                                            {/* Nút Thêm vào giỏ */}
                                            <button
                                                onClick={(e) =>
                                                    handleAddToCart(e, product)
                                                }
                                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center"
                                            >
                                                <ShoppingCart className="w-5 h-5 mr-2" />
                                                Thêm vào giỏ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={prevSlide}
                        disabled={isStartDisabled}
                        className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
                            isStartDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-500"
                        }`}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={isEndDisabled}
                        className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
                            isEndDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-500"
                        }`}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct;
