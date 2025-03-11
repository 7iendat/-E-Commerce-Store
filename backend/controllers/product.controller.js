import Product from "../models/product.model.js";
import redis from "../libs/redis.js";
import cloudinary from "../libs/cloudinary.js";

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

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    let cloudinaryRes = null;

    if (image) {
      cloudinaryRes = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryRes?.secure_url ? cloudinaryRes.secure_url : "",
      category,
    });

    return res.status(201).json({ product });
  } catch (error) {
    console.log("Error in create product", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Deleted image from cloudinary");
      } catch (error) {
        console.log(
          "Error something when delete image from cloudinary",
          error.message
        );
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log("Error something in delete product", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    return res.json(products);
  } catch (error) {
    console.log("error in get recommendations", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
};

export const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    return res.json(products);
  } catch (error) {
    console.log("error in get product by category ", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
};

export const toggleFeatureProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductCache();
      return res.json(updatedProduct);
    } else return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    console.log("error in toggleFeatureProduct", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
};

const updateFeaturedProductCache = async () => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error in updateFeaturedProductCache");
  }
};
