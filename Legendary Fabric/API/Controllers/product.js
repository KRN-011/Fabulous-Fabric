import { Products } from "../Models/Product.js";

// Add a new product

export const addProduct = async (req, res) => {
  const { title, description, price, category, quantity, imgSrc } = req.body;

  try {
    let product = await Products.create({
      title,
      description,
      price,
      category,
      quantity,
      imgSrc,
    });

    res.json({ message: "Product added successfully...!", product })
  } catch (error) {
    res.json({ message: error.message })
  }
};

// get products

export const getProducts = async (req, res) => {
  try {
    let products = await Products.find().sort({ createdAt: -1 });

    res.json({ message: "Products fetched successfully...!", products })
  } catch (error) {
    res.json({ message: error.message })
  }
};

// find product by ID

export const getProductById = async (req, res) => {
    const id = req.params.id;

    try {
      let product = await Products.findById(id);
  
        if ( !product ) {
            return res.status(404).json({ message: "Product not found" });
        }

      res.json({ message: "Product fetched successfully...!", product })
    } catch (error) {
      res.json({ message: error.message })
    }
};

// update product by ID

export const updateProductById = async (req, res) => {
    const id = req.params.id;

    try {
      let product = await Products.findByIdAndUpdate(id, req.body, {new:true});
  
        if ( !product ) {
            return res.status(404).json({ message: "Product not found" });
        }

      res.json({ message: "Product updated successfully...!", product })
    } catch (error) {
      res.json({ message: error.message })
    }
};

// delete product by ID

export const deleteProductById = async (req, res) => {
    const id = req.params.id;

    try {
      let product = await Products.findByIdAndDelete(id, req.body, {new:true});
  
        if ( !product ) {
            return res.status(404).json({ message: "Product not found" });
        }

      res.json({ message: "Product deleted successfully...!", product })
    } catch (error) {
      res.json({ message: error.message })
    }
};
