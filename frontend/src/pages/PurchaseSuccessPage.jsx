import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import React, { useEffect, useState } from "react";
import useCartStore from "../stores/useCartStore";
import axiosInstance from "../libs/axios";
import Confetti from "react-confetti";
import shortUUID from "short-uuid";
import { useNavigate } from "react-router";

const PurchaseSuccessPage = () => {
    const [isProcessing, setIsProcessing] = useState(true);
    const { clearCart } = useCartStore();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const generateOrderID = () => {
        const translator = shortUUID();
        return `#ORD-${translator.new()}`;
    };
    useEffect(() => {
        const handleCheckoutSuccess = async (sessionId) => {
            try {
                await axiosInstance.post("/payments/checkout-success", {
                    sessionId,
                });
                clearCart();
            } catch (error) {
                console.log(error);
            } finally {
                setIsProcessing(false);
            }
        };

        const sessionId = new URLSearchParams(window.location.search).get(
            "session_id"
        );
        if (sessionId) {
            handleCheckoutSuccess(sessionId);
        } else {
            setIsProcessing(false);
            setError("No session ID found in the URL");
        }
    }, [clearCart]);

    if (isProcessing) return "Processing...";
    if (error) return `Error: ${error}`;

    return (
        <div className="flex items-center justify-center px-4 py-6">
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                gravity={0.1}
                style={{ zIndex: 99 }}
                numberOfPieces={700}
                recycle={false}
            />
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10 ">
                <div className="p-6 sm:p-8">
                    <div className="flex justify-center">
                        <CheckCircle className=" text-emerald-400 w-16 h-16 mb-4 " />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
                        Thanh toán thành công!
                    </h1>
                    <p className="text-gray-300 text-center mb-2">
                        Cảm ơn bạn đã đặt hàng. Chúng tôi đang xử lý đơn hàng.
                    </p>
                    <p className="text-emerald-400 text-center text-sm mb-6">
                        Kiểm tra email của bạn để nhận thêm thông tin chi tiết.
                    </p>

                    <div className="bg-gray-700 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400 ">
                                Mã đơn hàng
                            </span>
                            <span className="text-sm font-semibold text-emerald-400 ">
                                {generateOrderID()}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400 ">
                                Ước tính thời gian vận chuyển
                            </span>
                            <span className="text-sm font-semibold text-emerald-400 ">
                                3-5 ngày
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center">
                            <HandHeart className="mr-2 " size={18} />
                            Cảm ơn bạn đã tin tưởng chúng tôi!
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
                        >
                            Tiếp tục mua sắm
                            <ArrowRight className="ml-1" size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseSuccessPage;
