import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle,
    Eye,
    EyeOff,
    Loader,
    Lock,
    Mail,
    User,
    UserPlus2,
} from "lucide-react";
import { Link } from "react-router";
import useUserStore from "../stores/useUserStore";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setError((prev) => ({
                ...prev,
                email: "Email không được để trống",
            }));
        } else if (!emailRegex.test(value)) {
            setError((prev) => ({ ...prev, email: "Email không hợp lệ" }));
        } else {
            setError((prev) => ({ ...prev, email: "" }));
        }
        setFormData({
            ...formData,
            email: value,
        });
    };

    const validatePassword = (value) => {
        if (value.length < 6) {
            setError((prev) => ({
                ...prev,
                password: "Mật khẩu phải có ít nhất 6 ký tự",
            }));
        } else {
            setError((prev) => ({ ...prev, password: "" }));
        }
        setFormData({
            ...formData,
            password: value,
        });
    };

    const validateConfirmPassword = (value) => {
        if (value !== formData.password) {
            setError((prev) => ({
                ...prev,
                confirmPassword: "Mật khẩu không khớp",
            }));
        } else {
            setError((prev) => ({ ...prev, confirmPassword: "" }));
        }
        setFormData({
            ...formData,
            confirmPassword: value,
        });
    };

    const { signUp, user, loading } = useUserStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(formData);
    };

    return (
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <motion.div
                className="sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={0.8}
            >
                <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400 ">
                    Tạo tài khoản mới!
                </h2>
            </motion.div>

            <motion.div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="bg-gray-900/60 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Tên người dùng
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={20} className="text-gray-400" />
                                </div>

                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="block w-full px-3 py-2 pl-10 bg-gray-700 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    placeholder="Json Nguyen"
                                />
                            </div>
                        </div>

                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-gray-400" />
                                </div>

                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        validateEmail(e.target.value)
                                    }
                                    className="block w-full px-3 py-2 pl-10 bg-gray-700 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    placeholder="json.nguyen@gmail.com"
                                />
                            </div>
                            {error.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {error.email}
                                </p>
                            )}
                        </div>

                        {/* password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Mật khẩu
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={20} className="text-gray-400" />
                                </div>

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) =>
                                        validatePassword(e.target.value)
                                    }
                                    className="block w-full px-3 py-2 pl-10 bg-gray-700 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    placeholder="*********"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                                    {showPassword ? (
                                        <Eye
                                            size={20}
                                            className="text-gray-400"
                                            onClick={() =>
                                                setShowPassword(false)
                                            }
                                        />
                                    ) : (
                                        <EyeOff
                                            size={20}
                                            className="text-gray-400"
                                            onClick={() =>
                                                setShowPassword(true)
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            {error.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {error.password}
                                </p>
                            )}
                        </div>

                        {/* confirm password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Xác nhận lại mật khẩu
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <CheckCircle
                                        size={20}
                                        className={`${
                                            error.confirmPassword ===
                                            "Mật khẩu không khớp"
                                                ? "text-red-600"
                                                : formData.confirmPassword !==
                                                  ""
                                                ? "text-green-400"
                                                : '"text-gray-400"'
                                        }`}
                                        aria-hidden={true}
                                    />
                                </div>

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        validateConfirmPassword(e.target.value)
                                    }
                                    className="block w-full px-3 py-2 pl-10 bg-gray-700 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    placeholder="*********"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                                    {showConfirmPassword ? (
                                        <Eye
                                            size={20}
                                            className="text-gray-400"
                                            onClick={() =>
                                                setShowConfirmPassword(false)
                                            }
                                        />
                                    ) : (
                                        <EyeOff
                                            size={20}
                                            className="text-gray-400"
                                            onClick={() =>
                                                setShowConfirmPassword(true)
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            {error.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">
                                    {error.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader
                                        size={20}
                                        className="mr-2 animate-spin"
                                        aria-hidden={true}
                                    />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <UserPlus2
                                        size={20}
                                        className="mr-2 "
                                        aria-hidden={true}
                                    />
                                    Sign up
                                </>
                            )}
                        </button>
                    </form>

                    <p className=" mt-8 text-center text-sm text-gray-400">
                        Already have a account?
                        <Link
                            to={"/login"}
                            className="font-medium text-emerald-500 hover:text-emerald-400"
                        >
                            {" "}
                            Login here{" "}
                            <ArrowRight size={16} className="inline" />
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUpPage;
