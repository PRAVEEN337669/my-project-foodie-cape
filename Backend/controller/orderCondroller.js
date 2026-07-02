const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.checkout = async (req, res) => {
  const userId = req.user.id;

  // get cart
  const cart = await Cart.findOne({ user: userId })
    .populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json("Cart is empty");
  }

  // calculate total
  let total = 0;

  cart.items.forEach(item => {
    total += item.product.price * item.quantity;
  });

  // create order
  const order = await Order.create({
    user: userId,
    items: cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    })),
    totalAmount: total
  });

  // clear cart
  cart.items = [];
  await cart.save();

  res.json(order);
};




