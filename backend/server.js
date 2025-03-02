import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();

app.listen(5000, () => {
  console.log(`Server is running in url => http://localhost:${PORT}`);
});
