import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticRoutes from "./routes/analytic.route.js";
import { connectionDB } from "./libs/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
// Cấu hình CORS
app.use(
    cors({
        origin: "http://localhost:3000", // Chỉ cho phép frontend truy cập
        credentials: true, // Cho phép gửi cookie, token
        methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức được phép
        allowedHeaders: ["Content-Type", "Authorization"], // Các header được phép
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticRoutes);

app.listen(PORT, () => {
    connectionDB();
    console.log(`Server is running in url => http://localhost:${PORT}`);
});
