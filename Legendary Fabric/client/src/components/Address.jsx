import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    address: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      phoneNumber: "",
      address: "",
    });

    // console.log(formData)
  };

  return (
    <>
      <div className="max-w-4xl mx-auto font-[sans-serif] p-6 bg-white shadow-lg rounded-lg mt-16">
        <div className="text-center mb-16">
          <h4 className="text-gray-700 text-xl font-semibold mt-6">
            Shipping Address
          </h4>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col items-center">
          <div className="grid sm:grid-cols-2 gap-8 w-full">
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChangeHandler}
                type="text"
                className="bg-gray-100 w-full text-gray-700 text-sm px-4 py-3.5 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm mb-2 block">
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                type="text"
                className="bg-gray-100 w-full text-gray-700 text-sm px-4 py-3.5 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="Enter country"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm mb-2 block">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                type="text"
                className="bg-gray-100 w-full text-gray-700 text-sm px-4 py-3.5 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="Enter state"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm mb-2 block">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                type="text"
                className="bg-gray-100 w-full text-gray-700 text-sm px-4 py-3.5 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm mb-2 block">
                Pincode
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHandler}
                type="text"
                className="bg-gray-100 w-full text-gray-700 text-sm px-4 py-3.5 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="Enter pincode"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm mb-2 block">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangeHandler}
                type="number"
                className="bg-gray-100 w-full text-gray-700 text-sm px-4 py-3.5 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="Enter phone number"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-gray-700 text-sm mb-2 block">
                Address
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={onChangeHandler}
                type="text"
                className="bg-gray-100 w-full text-gray-700 text-sm px-4 py-3.5 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="Enter address"
              />
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-zinc-900 bg-yellow-400 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Address;
