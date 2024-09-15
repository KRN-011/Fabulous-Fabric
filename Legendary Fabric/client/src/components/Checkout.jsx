import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const {
    cart,
    decreaseQuantity,
    addToCart,
    removeFromCart,
    userAddress,
    url,
    user,
    clearCart,
  } = useContext(AppContext);

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;

    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
        qty += cart.items[i].quantity;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQuantity(qty);
  }, [cart]);

  // razorpay

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        quantity: quantity,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user?._id,
      });

      const { orderId, amount: orderAmount } = orderResponse.data;

      const options = {
        key: "rzp_test_4qW8HHMQ0Qc9Vg",
        amount: orderAmount*100,
        currency: "INR",
        name: "Legedary Fabric",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user?._id,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData
          );

          if (api.data.success) {
            clearCart();
            navigate("/orderconfirmation");
          } else {
            console.log("Payment Failed");
          }
        },
        prefill: {
          name: "Legendary Fabric",
          email: "legendaryfabric@example.com",
          contact: "9929898299",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row text-xl md:text-2xl font-semibold justify-between w-[90vw] md:w-[40vw] mx-auto mt-32 md:mt-32">
        <div>
          <span className="text-2xl md:text-3xl font-bold">Total Price:</span> ₹
          {price}
        </div>
        <div>
          <span className="text-2xl md:text-3xl font-bold">Total Qty:</span>{" "}
          {quantity}
        </div>
      </div>

      <div className="mt-10 md:mt-16">
        {cart?.items?.map((product) => (
          <div key={product?._id} className="my-6">
            <div className="flex flex-col md:flex-row justify-between w-[90vw] md:w-[80vw] mx-auto h-auto items-center gap-4 md:gap-6">
              {/* Image Section */}
              <div className="w-full md:w-auto h-40 md:h-full">
                <img
                  src={product?.imgSrc}
                  alt=""
                  className="h-full w-full md:w-auto object-cover rounded-xl"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col gap-2 w-full md:w-[30vw] text-center md:text-left">
                <div className="text-lg md:text-2xl font-semibold">
                  {product?.title}
                </div>
                <div className="text-base md:text-lg font-semibold">
                  Price: ₹{product?.price}
                </div>
                <div className="text-base md:text-lg font-semibold">
                  Qty: {product?.quantity}
                </div>
              </div>

              {/* Quantity and Remove Buttons */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-5 justify-center items-center">
                <form className="max-w-xs mx-auto">
                  <div className="relative flex items-center max-w-[8rem]">
                    <button
                      onClick={() => decreaseQuantity(product?.productId, 1)}
                      type="button"
                      className="bg-gray-100 dark:bg-zinc-900 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-10"
                    >
                      <svg
                        className="w-3 h-3 text-zinc-900 dark:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-zinc-100 text-sm block w-full py-2.5 px-4 dark:bg-zinc-900">
                      {product?.quantity}
                    </div>
                    <button
                      onClick={() =>
                        addToCart(
                          product?.productId,
                          product?.title,
                          product?.price / product?.quantity,
                          1,
                          product?.imgSrc
                        )
                      }
                      type="button"
                      className="bg-gray-100 dark:bg-zinc-900 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-10"
                    >
                      <svg
                        className="w-3 h-3 text-zinc-100 dark:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </form>

                <button
                  onClick={() => removeFromCart(product?.productId)}
                  className="bg-red-600 px-6 py-1 md:px-6 md:py-2 rounded-lg text-zinc-100 text-sm md:text-base font-medium hover:bg-red-800 transition-all duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Address Section */}
      <div className="text-center my-16">
        <h4 className="text-zinc-900 text-4xl font-semibold mt-6">
          Shipping Address
        </h4>
      </div>

      <div className="flex justify-center">
        <div className="text-lg md:text-xl font-semibold space-y-3">
          <div>
            <strong>Name:</strong> {userAddress?.fullName}
          </div>
          <div>
            <strong>Phone Number:</strong> {userAddress?.phoneNumber}
          </div>
          <div>
            <strong>Address:</strong> {userAddress?.address}
          </div>
          <div>
            <strong>City:</strong> {userAddress?.city}
          </div>
          <div>
            <strong>State:</strong> {userAddress?.state}
          </div>
          <div>
            <strong>Country:</strong> {userAddress?.country}
          </div>
          <div>
            <strong>Pincode:</strong> {userAddress?.pincode}
          </div>
        </div>
      </div>

      {/* Proceed to Pay Button */}
      <div className="flex justify-center my-10">
        <button
          onClick={handlePayment}
          className="bg-yellow-400 px-6 py-2 md:px-8 md:py-3 rounded-lg text-zinc-900 text-lg md:text-xl font-medium hover:bg-yellow-500 transition-all duration-200"
        >
          Proceed to Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
