import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader, PlusCircle, Upload } from "lucide-react";
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
            console.log("error when create product", error);
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
                {/* name */}
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
                        name="name"
                        value={newProduct.name}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                name: e.target.value,
                            })
                        }
                        className="mt-1 block w-full bg-gray-700 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </div>

                {/* description */}
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Môt tả sản phẩm
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={newProduct.description}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                description: e.target.value,
                            })
                        }
                        rows={3}
                        className="mt-1 resize-none block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </div>

                {/* price */}
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
                        name="price"
                        value={newProduct.price}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                price: e.target.value,
                            })
                        }
                        step={1}
                        min={0}
                        className="mt-1 block w-full bg-gray-700 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </div>

                {/* category */}
                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Loại
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                category: e.target.value,
                            })
                        }
                        className="mt-1 block w-full bg-gray-700 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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

                {/* image */}
                <div className="mt-2 flex items-center ">
                    <input
                        type="file"
                        id="image"
                        className="sr-only "
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <label
                        htmlFor="image"
                        className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500"
                    >
                        <Upload className="h-5 w-5 inline-block mr-2" />
                        Tải ảnh lên
                    </label>

                    {newProduct.image && (
                        <span className="ml-3 text-sm text-gray-400">
                            Ảnh đã được tải lên
                        </span>
                    )}
                </div>

                {/* button */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader
                                className="mr-2 h-5 w-5 animate-spin"
                                aria-hidden={true}
                            />
                            Loading...
                        </>
                    ) : (
                        <>
                            <PlusCircle className="mr-2 h-5 w-5" /> Tạo sản phẩm
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default CreateProductForm;
