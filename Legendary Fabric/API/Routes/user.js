import express from 'express';
import { getUserProfile, getUsers, login, register } from '../Controllers/user.js';
import { Authenticated } from '../Middlewares/auth.js';

const router = express.Router();

// register user
router.post("/register", register)

//login user
router.post("/login", login)

//get all users
router.get("/all", getUsers)

// get user profile
router.get('/profile', Authenticated, getUserProfile)

export default router;