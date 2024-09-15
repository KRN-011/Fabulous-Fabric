import express from 'express';
import { addAdress, getAddress } from '../Controllers/address.js';
import { Authenticated } from '../Middlewares/auth.js';

const router = express.Router();

// add address
router.post('/add', Authenticated, addAdress)

// get one address
router.get('/get', Authenticated, getAddress)

export default router