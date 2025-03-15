import React from "react";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaCcVisa,
    FaCcMastercard,
    FaCcPaypal,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cột 1: Logo & Mô tả */}
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        E-commerce
                    </h2>
                    <p className="mt-3 text-sm">
                        Cửa hàng mua sắm trực tuyến hàng đầu với hàng ngàn sản
                        phẩm chất lượng.
                    </p>
                </div>

                {/* Cột 2: Liên kết */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                        Liên kết
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-emerald-400">
                                Giới thiệu
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-emerald-400">
                                Chính sách bảo mật
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-emerald-400">
                                Hỗ trợ khách hàng
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-emerald-400">
                                Điều khoản dịch vụ
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Cột 3: Thanh toán & Mạng xã hội */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                        Thanh toán
                    </h3>
                    <div className="flex space-x-4 text-2xl mb-4">
                        <FaCcVisa />
                        <FaCcMastercard />
                        <FaCcPaypal />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                        Theo dõi chúng tôi
                    </h3>
                    <div className="flex space-x-4 text-2xl">
                        <a href="#" className="hover:text-blue-500">
                            <FaFacebook />
                        </a>
                        <a href="#" className="hover:text-pink-500">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-blue-400">
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>

            {/* Dòng bản quyền */}
            <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} E-commerce. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
