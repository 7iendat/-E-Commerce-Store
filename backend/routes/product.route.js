import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductByCategory,
    getProductById,
    getRecommendations,
    toggleFeatureProduct,
    updateProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommendations", getRecommendations);
router.get("/category/:category", getProductByCategory);
router.post("/create-product", protectRoute, adminRoute, createProduct);
router.get("/:productId", getProductById);
router.put(
    "/:id",
    protectRoute,
    adminRoute,
    upload.single("image"),
    updateProduct
);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeatureProduct);
export default router;
