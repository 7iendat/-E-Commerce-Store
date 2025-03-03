import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import { connectionDB } from "./libs/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectionDB();
  console.log(`Server is running in url => http://localhost:${PORT}`);
});
