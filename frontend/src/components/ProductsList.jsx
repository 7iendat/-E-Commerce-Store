import { Edit2, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import ProductEditModal from "../modals/ProductEditModal";
import useProductStore from "../stores/useProductStore";

const ProductsList = () => {
    const { deleteProduct, toggleFeaturedProduct, products, fetchAllProducts } =
        useProductStore();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (product) => {
        setSelectedProduct(product); // Chọn sản phẩm cần chỉnh sửa
        setIsModalOpen(true);
    };

    const handleUpdate = async () => {
        await fetchAllProducts(); // Load lại danh sách sau khi cập nhật
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                            Sản phẩm
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                            Giá
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                            Loại
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                            Đặc trưng
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase">
                            Hành động
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {products?.map((p) => (
                        <tr key={p._id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="h-10 w-10 rounded-full object-cover mr-4"
                                />
                                <span className="text-white">{p.name}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                {p.price?.toLocaleString()} VND
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                {p.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => toggleFeaturedProduct(p._id)}
                                    className={`p-1 rounded-full ${
                                        p.isFeatured
                                            ? "bg-yellow-400 text-gray-900"
                                            : "bg-gray-600 text-gray-300"
                                    } hover:bg-yellow-600 transition`}
                                >
                                    <Star size={20} />
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center justify-center space-x-4">
                                    <button
                                        className="text-blue-500 hover:text-blue-400"
                                        onClick={() => handleEditClick(p)}
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-400"
                                        onClick={() => deleteProduct(p._id)}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal chỉnh sửa sản phẩm */}
            {isModalOpen && selectedProduct && (
                <ProductEditModal
                    visible={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={selectedProduct}
                    onUpdate={handleUpdate} // Load lại danh sách sau khi cập nhật
                />
            )}
        </div>
    );
};

export default ProductsList;
