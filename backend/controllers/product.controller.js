import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ products });
  } catch (error) {
    console.log("Error in get all products", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {};
