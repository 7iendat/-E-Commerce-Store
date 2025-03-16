import { X } from "lucide-react";
import useSearchStore from "../stores/useSearchStore";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

const SearchOverlay = () => {
    const {
        isOpen,
        searchQuery,
        results,
        closeSearch,
        setSearchQuery,
        setResults,
    } = useSearchStore();

    const [inputValue, setInputValue] = useState(searchQuery);

    useEffect(() => {
        // Nếu input rỗng, reset kết quả và không gọi API
        if (inputValue.trim() === "") {
            setResults([]);
            return;
        }

        // Debounce API call (chỉ gọi sau 500ms kể từ lần nhập cuối)
        const handler = debounce(() => {
            setSearchQuery(inputValue);
        }, 500);

        handler(); // Gọi debounce

        return () => handler.cancel(); // Cleanup khi unmount hoặc input thay đổi
    }, [inputValue, setSearchQuery, setResults]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-emerald-800/30 p-6 rounded-lg shadow-lg  w-full min-h-full relative">
                {/* Nút đóng */}
                <button
                    onClick={closeSearch}
                    className="absolute top-3 right-3 text-white hover:text-gray-400"
                >
                    <X size={24} />
                </button>

                {/* Thanh tìm kiếm */}
                <div className="flex justify-center items-center w-full h-full">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-3/5 p-3 border  text-black font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-900 shadow-md"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>

                {/* Hiển thị kết quả tìm kiếm */}
                <div className="mt-4 max-h-full overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {searchQuery && Array.isArray(results) && results.length > 0
                        ? results.map((product) => (
                              <ProductCard
                                  key={product._id}
                                  product={product}
                              />
                          ))
                        : searchQuery && (
                              <p className="text-white col-span-full text-center">
                                  Không tìm thấy sản phẩm.
                              </p>
                          )}
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;
