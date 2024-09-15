<div className="flex gap-3">
              <button
                onClick={() => decreaseQuantity(product?.productId, 1)}
                className="bg-yellow-400 px-4 py-1 md:px-6 md:py-2 rounded-lg text-zinc-900 text-sm md:text-base font-medium hover:bg-yellow-500 transition-all duration-200"
              >
                Qty--
              </button>
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
                className="bg-yellow-400 px-4 py-1 md:px-6 md:py-2 rounded-lg text-zinc-900 text-sm md:text-base font-medium hover:bg-yellow-500 transition-all duration-200"
              >
                Qty++
              </button>
            </div>