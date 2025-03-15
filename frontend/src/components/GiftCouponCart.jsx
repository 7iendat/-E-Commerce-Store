import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useCartStore from "../stores/useCartStore";

const GiftCouponCart = () => {
    const [userInputCode, setUserInputCode] = useState("");
    const { coupon, isCouponApplied, getMyCoupon, applyCoupon, removeCoupon } =
        useCartStore();

    useEffect(() => {
        getMyCoupon();
    }, [getMyCoupon]);

    useEffect(() => {
        if (coupon) setUserInputCode(coupon.code);
    }, [coupon]);
    const handleApplyCoupon = () => {
        if (!userInputCode) return;
        applyCoupon(userInputCode);
    };

    const handleRemoveCoupon = () => {
        if (!userInputCode) return;
        removeCoupon(userInputCode);
        setUserInputCode(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
        >
            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="voucher"
                        className="mb-2 block text-sm font-medium text-gray-300"
                    >
                        Bạn có phiếu giảm giá hoặc thẻ quà tặng?
                    </label>
                    <input
                        type="text"
                        id="voucher"
                        className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="Enter code here"
                        value={userInputCode}
                        onChange={(e) => setUserInputCode(e.target.value)}
                        required
                    />
                </div>

                <motion.button
                    type="button"
                    className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 "
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApplyCoupon}
                >
                    Áp dụng mã
                </motion.button>
            </div>

            {isCouponApplied && coupon && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-300">
                        Áp dụng mã thành công
                    </h3>
                    <p>
                        {coupon.code} - {coupon.discountPercentage}% off
                    </p>

                    <motion.button
                        type="button"
                        className="mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 "
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRemoveCoupon}
                    >
                        Bỏ chọn mã giảm giá
                    </motion.button>
                </div>
            )}
        </motion.div>
    );
};

export default GiftCouponCart;
