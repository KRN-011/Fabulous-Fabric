import express from 'express';
import { addProduct, deleteProductById, getProductById, getProducts,  updateProductById } from '../Controllers/product.js';

const router = express.Router();

// Add products
router.post('/add', addProduct)

//get products
router.get('/all', getProducts)

//get product by ID
router.get("/:id", getProductById)

//update product by ID
router.put("/:id", updateProductById)

//delete product by ID
router.delete("/:id", deleteProductById)

export default router;