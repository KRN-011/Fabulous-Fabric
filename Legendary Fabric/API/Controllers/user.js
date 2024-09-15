import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// User Registration

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.json({ message: "User already exist", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashPassword });
    res.json({
      message: "User registered successfully...!",
      user,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// User Login

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "User does not exist",
        success: false,
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ message: "Invalid credentials", success: false });
    }

    // jwt token

    const token = jwt.sign({ userId:user._id }, "SECRET", {
      expiresIn: '5d'
    })

    res.json({
      message: `Welcome ${user.name}`,
      success: true,
      token
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// Get All Users

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};


// get User Profile

export const getUserProfile = async (req, res) => {
  res.json({ user:req.user })
}
