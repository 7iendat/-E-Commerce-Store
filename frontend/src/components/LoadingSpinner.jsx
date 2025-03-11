import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="relative">
        <div className="w-20 h-20 border-emerald-200 border-2 rounded-full" />

        <div className="w-20 h-20 border-emerald-500 border-t-2 animate-spin rounded-full" />
        <div className="sr-only">Loading</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
