import express from 'express';
import { allOrders, checkOut, userOrder, verify } from '../Controllers/payment.js';
import { Authenticated } from '../Middlewares/auth.js'

const router = express.Router();

// checkout
router.post("/checkout", checkOut)

// verify and save to database
router.post("/verify-payment", verify)

// order confirmation
router.get("/userorder", Authenticated, userOrder)

// all order 
router.get("/orders", allOrders)

export default router