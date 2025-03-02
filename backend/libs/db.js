import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error something when connect MongoDB", error.message);
    process.exit(1);
  }
};
