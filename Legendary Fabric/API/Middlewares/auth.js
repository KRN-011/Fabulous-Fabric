import jwt, { decode } from "jsonwebtoken"
import { User } from "../Models/User.js"

export const Authenticated = async (req, res, next) => {
    const token = req.header("Auth")

    if(!token) {
        return res.json({ message: "Login First...!" })
    }

    const decoded = jwt.verify(token, 'SECRET')

    const id = decoded.userId
    
    let user = await User.findById(id)

    if( !user ) {
        res.json({ message: "User not Exist...!" })
    }

    req.user = user
    next()

}
