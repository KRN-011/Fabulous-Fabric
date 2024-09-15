import React from 'react'

const ShowOrderProduct = ({ items }) => {
  return (
    <>
      <div className="mt-10 md:mt-16">
  {items?.map((product) => (
    <div key={product?._id} className="my-6">
      <div className="flex flex-col md:flex-row justify-center items-center w-[90vw] md:w-[70vw] mx-auto h-auto gap-4 md:gap-4">
        {/* Image Section */}
        <div className="w-full md:w-auto h-44 md:h-56 flex justify-center">
          <img
            src={product?.imgSrc}
            alt={product?.title}
            className="h-full w-full md:w-auto object-cover rounded-xl"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-2 w-full md:w-[35vw] text-center md:text-left">
          <div className="text-xl md:text-3xl font-semibold text-center">
            {product?.title}
          </div>
          <div className="text-lg md:text-xl font-semibold text-center">
            Price: ₹{product?.price}
          </div>
          <div className="text-lg md:text-xl font-semibold text-center">
            Qty: {product?.quantity}
          </div>
        </div>
      </div>
    </div>
  ))}
      </div>
    </>
  )
}

export default ShowOrderProduct
