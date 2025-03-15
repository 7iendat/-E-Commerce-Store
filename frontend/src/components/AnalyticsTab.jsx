import { motion } from "framer-motion";
import { DollarSign, Icon, Package, ShoppingCart, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../libs/axios.js";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const AnalyticsTab = () => {
    const [analyticsData, setAnalyticsData] = useState({
        users: 0,
        products: 0,
        totalSales: 0,
        totalRevenue: 0,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [dailySalesData, setDailySalesData] = useState([]);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const res = await axiosInstance.get("/analytics");

                setAnalyticsData(res.data.analyticsData);
                setDailySalesData(res.data.dailySalesData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalyticsData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 ">
                <AnalyticsCard
                    title={"Tổng người dùng"}
                    value={analyticsData.users?.toLocaleString()}
                    icon={Users}
                    color={"from-emerald-500 to-teal-700"}
                />
                <AnalyticsCard
                    title={"Tổng sản phẩm"}
                    value={analyticsData.products?.toLocaleString()}
                    icon={Package}
                    color={"from-emerald-500 to-green-700"}
                />
                <AnalyticsCard
                    title={"Tổng sản phẩm đã bán"}
                    value={analyticsData.totalSales?.toLocaleString()}
                    icon={ShoppingCart}
                    color={"from-emerald-500 to-cyan-700"}
                />
                <AnalyticsCard
                    title={"Tổng doanh thu"}
                    value={`$${analyticsData.totalRevenue?.toLocaleString()}`}
                    icon={DollarSign}
                    color={"from-emerald-500 to-lime-700"}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-800/60 rounded-lg p-6 shadow-lg"
            >
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={dailySalesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={"name"} stroke="#D1D5DB" />
                        <YAxis yAxisId={"left"} stroke="#D1D5DB" />
                        <YAxis
                            yAxisId={"right"}
                            stroke="#D1D5DB"
                            orientation="right"
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                            yAxisId={"left"}
                            type={"monotone"}
                            dataKey={"sales"}
                            stroke="#10B981"
                            activeDot={{ r: 8 }}
                            name={"Sales"}
                        />
                        <Line
                            yAxisId={"right"}
                            type={"monotone"}
                            dataKey={"revenue"}
                            stroke="#3B82F6"
                            activeDot={{ r: 8 }}
                            name={"Sales"}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 0.5 }}
        className={`relative bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden ${color}`}
    >
        <div className="flex justify-center items-center">
            <div className="z-10">
                <p className="text-emerald-400 text-sm mb-1 font-semibold">
                    {title}
                </p>
                <h3 className="text-white text-3xl font-bold">{value}</h3>
            </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 opacity-30"></div>
        <div className="absolute -bottom-4 -right-4 text-emerald-800 opacity-50">
            <Icon className="h-32 w-32" />
        </div>
    </motion.div>
);
