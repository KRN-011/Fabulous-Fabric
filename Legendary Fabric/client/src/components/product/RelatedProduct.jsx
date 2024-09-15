import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category }) => {
  const { products, filteredData, setFilteredData, addToCart } = useContext(AppContext);

  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    setRelatedProduct(
      products.filter(
        (data) => data?.category?.toLowerCase() === category?.toLowerCase()
      )
    );
  }, [category, products]);

  const filterbyCategory = (category) => {
    setFilteredData(
      filteredData?.length === 0 &&
        products?.filter(
          (product) =>
            product?.category?.toLowerCase() === category?.toLowerCase()
        )
    );
  };

  return (
    <>
      <div className="container text-center mt-[8vh]">
        <h1 className="text-[4vw] font-semibold">Related products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 m-10">
        {filteredData?.map((product) => (
          <div key={product?._id} className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <Link
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              to={`/product/${product?._id}`}
            >
              <img
                className="object-cover"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="product image"
              />
            </Link>
            <div className="mt-4 px-5 pb-5 flex flex-col items-center">
              <a href="#">
                <h5 className="text-xl tracking-tight text-zinc-900">
                  {product?.title}
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-zinc-900 mr-[0.4vw]">
                    $449
                  </span>
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    addToCart(
                      product?._id,
                      product?.title,
                      product?.price,
                      1,
                      product?.imgSrc
                    );
                  }}
                  className="flex items-center justify-center rounded-md bg-yellow-400 px-5 py-2.5 text-center text-sm font-medium text-zinc-900 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default RelatedProduct;
