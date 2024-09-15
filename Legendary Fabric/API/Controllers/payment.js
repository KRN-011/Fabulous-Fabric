import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";

let razorpay = new Razorpay({
  key_id: "rzp_test_4qW8HHMQ0Qc9Vg",
  key_secret: "Iq7aIam88IyDrudLS0H8uAH5",
});

export const checkOut = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  let options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.json({
    orderId: order.id,
    amount: amount,
    cartItems,
    userShipping,
    userId,
    paymentStatus: "created",
  });
};

export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    paymentStatus: "paid",
  });

  res.json({ message: "Payment Successful", success:true, orderConfirm })
};

// user Specific order
export const userOrder = async (req, res) => {
  let userId = req.user?._id.toString()
  console.log(userId)
  let orders = await Payment.find({ userId: userId }).sort({ orderDate: -1 })

  res.json(orders)
}

// user Specific all order
export const allOrders = async (req, res) => {
  let orders = await Payment.find().sort({ orderDate: -1 })

  res.json(orders)
}