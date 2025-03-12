import React from "react";
import { Link } from "react-router";

const CategoryItem = ({ cate }) => {
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group">
      <Link to={"/category" + cate.href}>
        <div className="h-full w-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10"></div>

          <img
            src={cate.imageUrl}
            alt={cate.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />

          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-white text-2xl font-bold mb-2">{cate.name}</h3>
            <p className="text-gray-200 text-sm">{cate.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
