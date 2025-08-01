import React, { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import useProductStore from "../stores/useProductStore";
import FeaturedProduct from "../components/FeaturedProduct";
import Footer from "../components/Footer";

const categories = [
    { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
    { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
    { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
    { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
    { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
    { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
    { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
];

const HomePage = () => {
    const { fetchFeaturedProducts, products, loading } = useProductStore();

    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);
    return (
        <div className="relative min-h-screen text-white overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-600 mb-3">
                    Khám phá các danh mục của chúng tôi
                </h1>

                <p className="text-center text-xl text-gray-300 mb-12">
                    Khám phá những xu hướng mới nhất theo kiểu thân thiện với
                    môi trường
                </p>

                <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cate, idx) => (
                        <CategoryItem key={idx} cate={cate} />
                    ))}
                </div>

                {!loading && products.length > 0 && (
                    <FeaturedProduct featuredProducts={products} />
                )}
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;
