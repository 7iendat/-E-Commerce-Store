import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectionDB } from "./libs/db.js";

dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  connectionDB();
  console.log(`Server is running in url => http://localhost:${PORT}`);
});
