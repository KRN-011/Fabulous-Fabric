import { Address } from "../Models/Address.js";

// add address

export const addAdress = async (req, res) => {
  let { fullName, address, city, state, country, pincode, phoneNumber } =
    req.body;

    let userId = req.user;

  let userAddress = await Address.create({
    userId,
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  });

  res.json({ message: "Address added successfully...!", userAddress, success: true });
};

// get only one address

export const getAddress = async (req,res) => {
    let address = await Address.find({ userId:req.user }).sort({ createdAt: -1 });

    res.json({ message: "Address fetched successfully...!", userAddress:address[0] })
}