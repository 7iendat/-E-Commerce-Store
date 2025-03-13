import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, XCircle } from "lucide-react";
import { Link } from "react-router";

const PurchaseCancelPage = () => {
    return (
        <div className="flex items-center justify-center px-4 py-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10"
            >
                <div className="p-6 sm:p-8">
                    <div className="flex justify-center">
                        <XCircle className=" text-red-400 w-16 h-16 mb-4 " />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-400 mb-2">
                        Purchase Cancelled!
                    </h1>
                    <p className="text-gray-300 text-center mb-2">
                        Your order has been cancelled. No charges have been
                        made.
                    </p>

                    <div className="bg-gray-700 rounded-lg p-4 mb-6">
                        <p>
                            If you encountered any issues during the checkout
                            process, please don't hesitate to contact our
                            support team.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Link
                            to={"/"}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-400 font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
                        >
                            <ArrowLeft className="ml-1" size={16} />
                            Return to Shop
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PurchaseCancelPage;
