import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });

    const cartItems = products.map((p) => {
      const item = req.user.cartItems.find((cartItem) => cartItem.id === p.id);
      return { ...p.toJSON(), quantity: item.quantity };
    });

    return res.json(cartItems);
  } catch (error) {
    console.log("error in get cart products", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
};
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((i) => i.id === productId);

    if (existingItem) existingItem.quantity += 1;
    else user.cartItems.push(productId);

    await user.save();

    return res.json(user.cartItems);
  } catch (error) {
    console.log("error in addToCart", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
};
export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) user.cartItems = [];
    else user.cartItems = user.cartItems.filter((i) => i.id !== productId);

    await user.save();

    return res.json(user.cartItems);
  } catch (error) {
    console.log("error in removeAllFromCart ", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
};
export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((i) => i.id === productId);

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((i) => i.id !== productId);
        await user.save();
        return res.json(user.cartItems);
      }

      existingItem.quantity = quantity;
      await user.save();
      return res.json(user.cartItems);
    } else return res.status(404).json({ message: "product not found" });
  } catch (error) {
    console.log("error in updateQuantity", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
};
