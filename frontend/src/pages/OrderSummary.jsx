import { motion } from "framer-motion";
import React from "react";
import useCartStore from "../stores/useCartStore";
import { Link } from "react-router";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../libs/axios";

const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLIC_KEY);

const OrderSummary = () => {
    const { subTotal, total, coupon, isCouponApplied, cart } = useCartStore();
    const savings = total - subTotal;
    const formattedSubtotal = subTotal.toLocaleString("vi-VN");
    const formattedTotal = total.toLocaleString("vi-VN");
    const formattedSavings = savings.toLocaleString("vi-VN");

    const handlePayment = async () => {
        const stripe = await stripePromise;
        const res = await axiosInstance.post(
            "/payments/create-checkout-session",
            { products: cart, couponCode: coupon ? coupon.code : null }
        );

        const session = res.data;

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error("Error: ", result.error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 rounded-lg border border-gray-700 bg-gray-700 p-4 shadow-sm sm:p-6"
        >
            <p className="text-xl font-semibold text-emerald-400">Đơn hàng</p>
            <div className="space-y-6">
                <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-300">
                            Giá ban đầu
                        </dt>
                        <dd className="text-base font-medium text-white">
                            {formattedSubtotal} VND
                        </dd>
                    </dl>

                    {savings > 0 && (
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-300">
                                Tiết kiệm
                            </dt>
                            <dd className="text-base font-medium text-emerald-400">
                                {formattedSavings} VND
                            </dd>
                        </dl>
                    )}

                    {coupon && isCouponApplied && (
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-300">
                                Mã khuyến mãi ({coupon.code})
                            </dt>
                            <dd className="text-base font-medium text-emerald-600">
                                -{coupon.discountPercentage}%
                            </dd>
                        </dl>
                    )}

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
                        <dt className="text-base font-normal text-gray-300">
                            Tổng cộng
                        </dt>
                        <dd className="text-base font-medium text-emerald-600">
                            {formattedTotal} VND
                        </dd>
                    </dl>
                </div>

                <motion.button
                    className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePayment}
                >
                    Thanh toán
                </motion.button>

                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-400">
                        or
                    </span>
                    <Link
                        to={"/"}
                        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
                    >
                        Tiếp tục mua sắm
                    </Link>

                    <MoveRight size={16} />
                </div>
            </div>
        </motion.div>
    );
};

export default OrderSummary;
