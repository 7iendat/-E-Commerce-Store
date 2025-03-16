import { useEffect } from "react";
import { User, Mail, ShieldCheck, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const ProfilePage = () => {
    const { user } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) return null; // Tránh lỗi nếu chưa có dữ liệu user

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex flex-col items-center">
                    {/* Ảnh đại diện */}
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-4xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-semibold mt-3">{user.name}</h2>
                    <p className="text-gray-400">{user.email}</p>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-3">
                        <User size={20} />
                        <span className="font-medium">Tên: {user.name}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Mail size={20} />
                        <span className="font-medium">Email: {user.email}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <ShieldCheck size={20} />
                        <span className="font-medium">
                            Vai trò: {user.role === "admin" ? "Admin" : "User"}
                        </span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Calendar size={20} />
                        <span className="font-medium">
                            Ngày tham gia:{" "}
                            {new Date(user.createdAt).toLocaleDateString(
                                "vi-VN",
                                {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                }
                            )}
                        </span>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-6 rounded-md font-medium transition duration-300">
                        Chỉnh sửa hồ sơ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
