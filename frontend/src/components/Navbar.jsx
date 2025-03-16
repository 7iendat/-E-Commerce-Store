import {
    Lock,
    LogIn,
    LogOut,
    Search,
    ShoppingCart,
    UserPlus2,
} from "lucide-react";
import React from "react";
import { Link, useSearchParams } from "react-router";
import useUserStore from "../stores/useUserStore";
import useCartStore from "../stores/useCartStore";
import useSearchStore from "../stores/useSearchStore";
// import useProductStore from "../stores/useProductStore";

const Navbar = () => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";
    const { cart } = useCartStore();
    // const { search, products, setSearch } = useProductStore();
    // console.log("prod", products);
    const { openSearch } = useSearchStore();

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center justify-between w-full sm:w-auto min-w-0">
                        <Link
                            to={"/"}
                            className="flex items-center text-2xl font-bold text-emerald-400 space-x-2"
                        >
                            E-commerce
                        </Link>

                        <button
                            onClick={openSearch}
                            className="flex items-center space-x-2 hover:text-green-400 pl-2"
                        >
                            <Search size={20} />
                            <span className="hidden sm:inline">Tìm kiếm</span>
                        </button>
                    </div>

                    {/* {products.length !== 0 && (
                        <div className="w-1/3">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="block w-full px-3 py-2 pl-10 bg-gray-700 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    )} */}

                    <nav className="flex flex-wrap items-center gap-4">
                        <Link
                            to={"/"}
                            className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
                        >
                            Trang chủ
                        </Link>
                        {user && (
                            <Link to={"/cart"} className="relative group">
                                <ShoppingCart
                                    className="inline-block mr-1 group-hover:text-emerald-400"
                                    size={20}
                                />
                                <span className="hidden sm:inline">
                                    Giỏ hàng
                                </span>
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                to={"/secret-dashboard"}
                                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                            >
                                <Lock size={18} className="inline-block mr-1" />
                                <span className="hidden sm:inline">
                                    Dashboard
                                </span>
                            </Link>
                        )}

                        {user ? (
                            <button
                                onClick={() => logout()}
                                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                            >
                                <LogOut size={18} />
                                <span className="hidden sm:inline ml-2">
                                    Đăng xuất
                                </span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    to={"/signup"}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                                >
                                    <UserPlus2 size={18} className="mr-2" />{" "}
                                    Đăng kí
                                </Link>

                                <Link
                                    to={"/login"}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                                >
                                    <LogIn size={18} className="mr-2" /> Đăng
                                    nhập
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
