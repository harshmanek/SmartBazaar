const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const getCart = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const cart = await Cart.findOne({ customer_id }).populate(
      "cart_items.product_id"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const { customer_id, cart_number } = req.params;
    const { product_id, quantity } = req.body;

    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ customer_id });
    if (!cart) {
      cart = new Cart({ customer_id, cart_items: [] });
    }

    const existingItem = cart.cart_items.find(
      (item) =>
        item.product_id.toString() === product_id &&
        item.cart_number === cart_number
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.cart_items.push({
        cart_number,
        product_id,
        product_name: product.name,
        quantity,
        price: product.price,
        added_at: new Date(),
      });
    }

    await cart.save();

    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { customer_id, item_id } = req.params;

    const cart = await Cart.findOne({ customer_id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.cart_items.findIndex(
      (item) => item._id.toString() === item_id
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.cart_items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateItemQuantity = async (req, res) => {
  try {
    const { customer_id, item_id } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ customer_id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.cart_items.find(
      (item) => item._id.toString() === item_id
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCartItemsByNumber = async (req, res) => {
  try {
    const { customer_id, cart_number } = req.params;
    const cart = await Cart.findOne({ customer_id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Efficiently filter for specific cart_number
    const filteredItems = cart.cart_items.filter(
      (item) => item.cart_number == cart_number
    );

    res.json({
      cart_number,
      items: filteredItems,
      total_amount: cart.total_amounts[cart_number],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const cart = await Cart.findOneAndDelete({ customer_id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Customer requests verification
const requestVerification = async (req, res) => {
  try {
    const { customer_id } = req.params;

    const cart = await Cart.findOne({ customer_id, verified: false });
    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found or already verified" });
    }

    cart.wants_verification = true;
    await cart.save();

    res.status(200).json({ message: "Verification requested successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  getCartItemsByNumber,
  deleteCart,
  requestVerification,
};
