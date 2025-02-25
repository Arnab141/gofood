import userModel from '../models/usermodel.js';

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();

    res.json({ success: true, message: "Added to cart" });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.json({ success: false, message: "Failed to add item to cart" });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId]) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] <= 0) {
        delete cartData[req.body.itemId]; // Remove item if quantity reaches 0
      }
    }

    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();

    res.json({ success: true, message: "Removed from cart" });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.json({ success: false, message: "Failed to remove item from cart" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (err) {
    console.error("Error fetching cart data:", err);
    res.json({ success: false, message: "Failed to fetch cart data" });
  }
};

export { addToCart, removeFromCart, getCart };
