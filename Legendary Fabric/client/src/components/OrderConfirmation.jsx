import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";

const OrderConfirmation = () => {
  const { userOrder, cart } = useContext(AppContext);

  const [latestOrder, setLatestOrder] = useState({})
  
  useEffect(() => {

    if( userOrder ) {
      setLatestOrder(userOrder[0])
    }

  }, [userOrder])

  return (
    <>
      <div className="text-center my-16">
        <h4 className="text-zinc-900 text-5xl max-md:text-3xl font-bold mt-6">
          Your Order has been Confirmed!
        </h4>
        <h5 className="text-zinc-900 text-3xl max-md:text-xl font-medium mt-6">
          It will deliver to you soon!
        </h5>
      </div>

      <ShowOrderProduct items= {latestOrder?.orderItems}/>

      {/* Shipping Address Section */}
      <div>
      <div className="text-center my-16">
        <h4 className="text-zinc-900 text-4xl font-semibold mt-6">
          Order details & Shipping Address
        </h4>
      </div>

      <div className="flex justify-center mx-5">
        <div className="text-base md:text-xl font-semibold space-y-3 mb-8">
          <div>
            <strong>Order ID:</strong> {latestOrder?.orderId}
          </div>
          <div>
            <strong>Payment ID:</strong> {latestOrder?.paymentId}
          </div>
          <div>
            <strong>Payment status:</strong> {latestOrder?.paymentStatus}
          </div>
          <div>
            <strong>Name:</strong> {latestOrder?.userShipping?.fullName}
          </div>
          <div>
            <strong>Phone Number:</strong> {latestOrder?.userShipping?.phoneNumber}
          </div>
          <div>
            <strong>Address:</strong> {latestOrder?.userShipping?.address}
          </div>
          <div>
            <strong>City:</strong> {latestOrder?.userShipping?.city}
          </div>
          <div>
            <strong>State:</strong> {latestOrder?.userShipping?.state}
          </div>
          <div>
            <strong>Country:</strong> {latestOrder?.userShipping?.country}
          </div>
          <div>
            <strong>Pincode:</strong> {latestOrder?.userShipping?.pincode}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
