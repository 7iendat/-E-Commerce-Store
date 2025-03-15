import React from "react";
import useProductStore from "../stores/useProductStore";
import { motion } from "framer-motion";
import { Star, Trash } from "lucide-react";

const ProductsList = () => {
    const { deleteProduct, toggleFeaturedProduct, products } =
        useProductStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
        >
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Sản phẩm
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Giá
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Loại
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Đặc trưng
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Hành động
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {products?.map((p) => (
                        <tr key={p._id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-white">
                                            {p.name}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-300 ">
                                    ${p.price.toFixed(2)}
                                </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-300 ">
                                    {p.category}
                                </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => toggleFeaturedProduct(p._id)}
                                    className={`p-1 rounded-full ${
                                        p.isFeatured
                                            ? "bg-yellow-400 text-gray-900"
                                            : "bg-gray-600 text-gray-300"
                                    } hover:bg-yellow-600 transition-colors duration-300`}
                                >
                                    <Star size={20} />
                                </button>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    className="text-red-500 hover:text-red-400"
                                    onClick={() => deleteProduct(p._id)}
                                >
                                    <Trash size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};

export default ProductsList;
