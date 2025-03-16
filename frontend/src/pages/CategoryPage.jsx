import React, { useEffect } from "react";
import useProductStore from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
    const { fetchProductsByCategory, products, setSortBy, sortBy } =
        useProductStore();

    const { category } = useParams();

    useEffect(() => {
        fetchProductsByCategory(category);
    }, [fetchProductsByCategory, category, sortBy]);

    return (
        <div className="min-h-screen">
            <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center text-4xl sm:text-5xl font-bold text-emerald-500 mb-8 "
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.div>
                <select
                    className="p-2 border rounded w-40 mb-4 bg-emerald-700 text-white font-semibold hover:cursor-pointer "
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Sắp xếp theo</option>
                    <option value="price_asc">Giá: Thấp đến cao</option>
                    <option value="price_desc">Giá: Cao đến thấp</option>
                    <option value="name_asc">Tên: A-Z</option>
                    <option value="name_desc">Tên: Z-A</option>
                </select>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
                >
                    {products?.length === 0 && (
                        <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
                            Không tìm thấy sản phẩm loại này!
                        </h2>
                    )}

                    {products?.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default CategoryPage;
