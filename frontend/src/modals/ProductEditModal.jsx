import { Modal, Input, Form, Button, Upload, message, Select } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axiosInstance from "../libs/axios";
import toast from "react-hot-toast";

const categories = [
    "jeans",
    "t-shirts",
    "shoes",
    "glasses",
    "jackets",
    "suits",
    "bags",
];

const ProductEditModal = ({ visible, onClose, product, onUpdate }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null); // File ảnh mới
    const [preview, setPreview] = useState(product?.image || ""); // Ảnh hiển thị

    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
            });
            setPreview(product.image || ""); // Hiển thị ảnh cũ khi mở modal
        }
    }, [product, form]);

    const handleImageChange = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result); // Hiển thị ảnh mới
        reader.readAsDataURL(file);
        setImage(file); // Lưu file để upload
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(product?.image || ""); // Quay lại ảnh cũ
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", values.price);
            formData.append("category", values.category);

            if (image) {
                // Upload ảnh mới lên Cloudinary
                const imageFormData = new FormData();
                imageFormData.append("file", image);
                imageFormData.append(
                    "upload_preset",
                    import.meta.env.VITE_CLOUDINARY_CLOUD_PRESET
                );

                const uploadResponse = await fetch(
                    `https://api.cloudinary.com/v1_1/${
                        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                    }/image/upload`,
                    {
                        method: "POST",
                        body: imageFormData,
                    }
                );
                const uploadData = await uploadResponse.json();
                formData.append("image", uploadData.secure_url);
            } else {
                formData.append("image", product.image); // Giữ ảnh cũ nếu không chọn ảnh mới
            }

            await axiosInstance.put(`/products/${product._id}`, formData);
            toast.success("Cập nhật sản phẩm thành công!");
            onUpdate();
            onClose();
        } catch (error) {
            toast.error("Cập nhật thất bại!", error.message);
        }
        setLoading(false);
    };

    return (
        <Modal
            title={<span className="text-white">Chỉnh sửa sản phẩm</span>}
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
            className="custom-modal"
        >
            <div className="p-6 bg-gray-800 text-white">
                <Form form={form} layout="vertical" onFinish={handleUpdate}>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 space-y-4">
                            <Form.Item
                                label={
                                    <span className="text-gray-300">
                                        Tên sản phẩm
                                    </span>
                                }
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tên sản phẩm!",
                                    },
                                ]}
                            >
                                <Input className="bg-gray-700 text-white border border-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                            </Form.Item>

                            <Form.Item
                                label={
                                    <span className="text-gray-300">Mô tả</span>
                                }
                                name="description"
                            >
                                <Input.TextArea
                                    autoSize={{ minRows: 3, maxRows: 7 }}
                                    className="bg-gray-700 text-white border border-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                                />
                            </Form.Item>

                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item
                                    label={
                                        <span className="text-gray-300">
                                            Giá
                                        </span>
                                    }
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập giá!",
                                        },
                                    ]}
                                    className="w-full"
                                >
                                    <Input
                                        type="number"
                                        className="bg-gray-700 text-white border border-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <span className="text-gray-300">
                                            Danh mục
                                        </span>
                                    }
                                    name="category"
                                >
                                    <Select className="w-full">
                                        {categories.map((cate) => (
                                            <Select.Option
                                                key={cate}
                                                value={cate}
                                            >
                                                {cate}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        {/* Ảnh sản phẩm */}
                        <div className="flex flex-col items-center space-y-4">
                            <span className="text-gray-300">Hình ảnh</span>
                            {preview && (
                                <div className="relative">
                                    <img
                                        src={preview}
                                        alt="Product"
                                        className="w-48 h-48 rounded-lg object-cover border border-gray-500"
                                    />
                                    {image && (
                                        <CloseCircleOutlined
                                            className="absolute top-0 right-0 text-red-500 text-xl cursor-pointer"
                                            onClick={handleRemoveImage}
                                        />
                                    )}
                                </div>
                            )}
                            <Upload
                                beforeUpload={(file) => {
                                    handleImageChange(file);
                                    return false;
                                }}
                                showUploadList={false}
                            >
                                <Button
                                    icon={<UploadOutlined />}
                                    className="bg-blue-600 text-white hover:bg-blue-500"
                                >
                                    Chọn ảnh mới
                                </Button>
                            </Upload>
                            {image && (
                                <p className="text-gray-300 mt-2 text-sm">
                                    Ảnh đã chọn: {image.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                        <Button
                            onClick={onClose}
                            className="bg-gray-600 text-white hover:bg-gray-500"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="bg-green-600 text-white hover:bg-green-500"
                        >
                            Cập nhật
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
};

export default ProductEditModal;
