import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/user.js'
import bodyParser from 'express';
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import cors from 'cors'
import paymentRouter from './Routes/payment.js'

const app = express();

app.use(bodyParser.json())

app.use(cors({
    origin: true,
    methods: ["GET", 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

// home testing route
app.get('/',(req,res) => res.json({ message: "This is home route" }))

// user router
app.use("/api/user", userRouter)

// product router
app.use("/api/product", productRouter)

// cart router
app.use("/api/cart", cartRouter)

// address router
app.use("/api/address", addressRouter)

//payment router
app.use("/api/payment", paymentRouter)

mongoose.connect("mongodb+srv://karankansagra212:K%40ran011@cluster0.ypoqz.mongodb.net/", {
    dbName:"Legendary_Fabric"
}
).then(() => console.log("Database connected successfully!")
).catch((error) => console.log(error)
)

const port = 1000;

app.listen(port, () => console.log(`Server is running on port ${port}`));