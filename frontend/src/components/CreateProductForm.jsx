import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader, PlusCircle, Upload, X } from "lucide-react";
import useProductStore from "../stores/useProductStore";

const categories = [
    "jeans",
    "t-shirts",
    "shoes",
    "glasses",
    "jackets",
    "suits",
    "bags",
];

const CreateProductForm = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
    });

    const { loading, createProduct } = useProductStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(newProduct);
            setNewProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                image: "",
            });
        } catch (error) {
            console.log("Lỗi khi tạo sản phẩm", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setNewProduct({ ...newProduct, image: "" });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
        >
            <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
                Thêm sản phẩm mới
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Tên sản phẩm
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={newProduct.name}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                name: e.target.value,
                            })
                        }
                        className="mt-1 block w-full bg-gray-700 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Mô tả sản phẩm
                    </label>
                    <textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                description: e.target.value,
                            })
                        }
                        rows={6}
                        className="mt-1 block w-full resize-none bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Giá sản phẩm
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={newProduct.price}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                price: e.target.value,
                            })
                        }
                        className="mt-1 block w-full bg-gray-700 border border-gray-700 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Loại sản phẩm
                    </label>
                    <select
                        id="category"
                        value={newProduct.category}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                category: e.target.value,
                            })
                        }
                        className="mt-1 block w-full bg-gray-700 border border-gray-700 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500"
                        required
                    >
                        <option value="">Chọn loại</option>
                        {categories.map((cate) => (
                            <option key={cate} value={cate}>
                                {cate}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Image Upload */}
                <div className="mt-2 flex flex-col items-center">
                    {!newProduct.image ? (
                        <>
                            <input
                                type="file"
                                id="image"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <label
                                htmlFor="image"
                                className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md text-gray-400 hover:bg-gray-600"
                            >
                                <Upload className="h-5 w-5 inline-block mr-2" />
                                Chọn ảnh
                            </label>
                        </>
                    ) : (
                        <div className="relative">
                            <img
                                src={newProduct.image}
                                alt="Ảnh sản phẩm"
                                className="w-32 h-32 object-cover rounded-lg shadow-md"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader className="mr-2 h-5 w-5 animate-spin" />
                            Đang tải...
                        </>
                    ) : (
                        <>
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Tạo sản phẩm
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default CreateProductForm;
