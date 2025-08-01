import React from "react";
import useCartStore from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "./OrderSummary";
import GiftCouponCart from "../components/GiftCouponCart";

const CartPage = () => {
    const { cart } = useCartStore();

    return (
        <div className="py-8 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full mx-auto flex-none lg:max-w-2xl xl:max-w-4xl"
                    >
                        {cart.length === 0 ? (
                            <EmptyCart />
                        ) : (
                            <div className="space-y-6">
                                {cart.map((i) => (
                                    <CartItem key={i._id} item={i} />
                                ))}
                            </div>
                        )}

                        {cart.length > 0 && <PeopleAlsoBought />}
                    </motion.div>

                    {cart.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
                        >
                            <OrderSummary />
                            <GiftCouponCart />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;

const EmptyCart = () => {
    return (
        <motion.div
            className="flex flex-col justify-center items-center py-6 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ShoppingCart className="h-24 w-24 text-gray-300" />
            <h3 className="text-2xl font-semibold">Giỏ hàng của bạn trống</h3>
            <p className="text-gray-400">
                Có vẻ như bạn chưa thêm bất cứ thứ gì vào giỏ hàng của mình.
            </p>
            <Link
                to={"/"}
                className="mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600"
            >
                Bắt đầu mua sắm
            </Link>
        </motion.div>
    );
};
