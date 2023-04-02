import jwt from "jsonwebtoken";
import User from "../model/userModel.js";


const authToken = async (req, res, next)=> {
    const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
    console.log(req.user);

    try {
        if(!token) {
            return res.status(401).json({
                succeded: false,
                error: "token is not available"
            })
        }
    
        req.user = await User.findById(
            jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY).userId
        );
    
        next();

    } catch (error) {
        succeded: false,
        error
    }
}

export {authToken};