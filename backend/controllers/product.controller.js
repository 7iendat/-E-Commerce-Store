import Product from "../models/product.model.js";
import redis from "../libs/redis.js";

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

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // not in redis
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts)
      return res.status(404).json({ message: "No featured products found" });

    // store in redis
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    return res.json(featuredProducts);
  } catch (error) {
    console.log("Error in get featuredProducts", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
};
