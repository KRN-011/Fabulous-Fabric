import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQuantity, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
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

  return (
    <>
      {cart?.items?.length == 0 ? (
        <>
        <div className="flex mt-32 justify-center">
        <button
            onClick={() => navigate("/")}
            className="bg-yellow-400 px-4 py-1 md:px-6 md:py-2 rounded-lg text-zinc-900 text-sm md:text-xl font-medium hover:bg-yellow-500 transition-all duration-200"
          >
            Continue Shopping...
          </button>
        </div>
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row text-xl md:text-2xl font-semibold justify-between w-[90vw] md:w-[40vw] mx-auto mt-28 md:mt-32">
            <div>
              <span className="text-2xl md:text-3xl font-bold">
                Total Price:
              </span>{" "}
              ₹{price}
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-bold">Total Qty:</span>{" "}
              {quantity}
            </div>
          </div>
        </>
      )}

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

              {/* Buttons for Quantity and Removal */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-5 justify-center items-center">
                <form class="max-w-xs mx-auto">
                  <div class="relative flex items-center max-w-[8rem]">
                    <button
                      onClick={() => decreaseQuantity(product?.productId, 1)}
                      F
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="quantity-input"
                      class="bg-gray-100 dark:bg-zinc-900 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11"
                    >
                      <svg
                        class="w-3 h-3 text-zinc-100 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-zinc-100 text-sm block w-full py-2.5 px-4 dark:bg-zinc-900">
                      {" "}
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
                      id="increment-button"
                      data-input-counter-increment="quantity-input"
                      class="bg-gray-100 dark:bg-zinc-900 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11"
                    >
                      <svg
                        class="w-3 h-3 text-zinc-100 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
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

      {cart?.items?.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center my-10 md:my-20">
          <button
            onClick={() => navigate("/shipping")}
            className="bg-yellow-400 px-4 py-1 md:px-6 md:py-2 rounded-lg text-zinc-900 text-sm md:text-base font-medium hover:bg-yellow-500 transition-all duration-200"
          >
            Check Out
          </button>
          <button
            onClick={clearCart}
            className="bg-red-600 px-4 py-1 md:px-6 md:py-2 rounded-lg text-zinc-100 text-sm md:text-base font-medium hover:bg-red-800 transition-all duration-200"
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
