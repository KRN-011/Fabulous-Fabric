import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../Button";
import RelatedProduct from "./RelatedProduct";
import Loader from "../Loader"

const ProductDetail = () => {
  const { id } = useParams();

  const url = "http://localhost:1000/api";

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
      try {
      const fetchProduct = async () => {
        const api = await axios.get(`${url}/product/${id}`, {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        });
  
        setProduct(api?.data?.product);
      };
  
      fetchProduct();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (<div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
      <Loader />
    </div>)
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <>
      <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={product?.imgSrc}
            alt={product?.title}
            className="w-full max-w-sm rounded-lg"
          />
        </div>

        {/* Product Details Section */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product?.title}</h1>
          <p className="text-gray-600">{product?.description}</p>
          <p className="text-xl font-semibold">Price: ₹{product?.price}</p>
          <div className="flex gap-[1vw]">
          <Button text={"Buy Now"}/>
          <Button text={"Add to Cart"}/>
          </div>
        </div>
      </div>
    </div>

      <div>
        <RelatedProduct category={product?.category}/>
      </div>
    </>
  );
};

export default ProductDetail;
