import { Cart } from "../Models/Cart.js";

// add to Cart

export const addToCart = async (req,res) => {
    const { productId, title, price, quantity, imgSrc } = req.body;

    const userId = req.user;

    let cart = await Cart.findOne({ userId });

    if( !cart ) {
        cart = new Cart({ userId, items:[] })
    }

    const itemIndex = cart.items.findIndex((items) => items.productId.toString() === productId);
    
    if( itemIndex > -1 ) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price += price*quantity;
    } else {
        cart.items.push({ productId, title, price, quantity, imgSrc })
    }

    await cart.save()

    res.json({ message: "Item added to cart...!", cart })
}

// get user cart

export const userCart = async (req,res) => {
    const userId = req.user;

    let cart = await Cart.findOne({ userId });

    if( !cart ) {
        return res.json({ message: "Cart not found...!" })
    }

    res.json({ message: "Cart fetched successfully", cart })
}

// remove product from cart

export const removeProductFromCart = async (req,res) => {
    const productId = req.params.productId;
    const userId = req.user;

    let cart = await Cart.findOne({ userId });

    if( !cart ) {
        return res.json({ message: "Cart not found...!" })
    }

    cart.items = cart.items.filter((item) => item.productId.toString() != productId)

    await cart.save();

    res.json({ message: "Product removed from cart successfully...!", cart })
}

// clear cart

export const clearCart = async (req,res) => {
    const userId = req.user;

    let cart = await Cart.findOne({ userId });

    if( !cart ) {
        cart = new Cart({items:[]})
        return res.json({ message: "Cart not found...!" })
    } else {
        cart.items = []
    }

    await cart.save();

    res.json({ message: "Cart has been cleared successfully...!", cart })
}

// decrease quantity of product from Cart

export const decreaseProductQuantityFromCart = async (req,res) => {
    const { productId, quantity } = req.body;

    const userId = req.user;

    let cart = await Cart.findOne({ userId });

    if( !cart ) {
        cart = new Cart({ userId, items:[] })
    }

    const itemIndex = cart.items.findIndex((items) => items.productId.toString() === productId);
    
    if( itemIndex > -1 ) {
        const item = cart.items[itemIndex]

        if( item.quantity > quantity ) {
            const pricePerUnit = item.price/item.quantity;

            item.quantity -= quantity
            item.price -= pricePerUnit * quantity
        } else {
            cart.items.splice(itemIndex, 1)
        }

    } else {
        return res.json({ message: "Invalid Product ID...!", cart })
    }

    await cart.save()

    res.json({ message: "Item Quantity decreased successfully...!", cart })
}