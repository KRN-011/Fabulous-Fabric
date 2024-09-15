import express from 'express';
import { addToCart, clearCart, decreaseProductQuantityFromCart, removeProductFromCart, userCart } from '../Controllers/cart.js';
import { Authenticated } from '../Middlewares/auth.js';

const router = express.Router();

// add to cart
router.post('/add', Authenticated, addToCart)

// get user cart
router.get('/user', Authenticated, userCart)

// remove product from cart
router.delete('/remove/:productId', Authenticated, removeProductFromCart)

// clear user cart
router.delete('/clear', Authenticated, clearCart)

// decrease items quantity
router.post('/--quantity', Authenticated, decreaseProductQuantityFromCart)

export default router;