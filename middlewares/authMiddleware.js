import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const authToken = async (req, res, next)=> {
    const token = req.cookies.JWEBToken
    console.log(req.user);

    try {
       if(token) {
            req.user = await User.findById(
                jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY, (err) => {
                    if(err) {
                        console.log(err.message);
                        res.redirect("/login")
                    }else {
                        next();
                    }
                })
            );
       } else {
            res.redirect("/login");
       }
    

    } catch (error) {
        succeded: false,
        error
    }
}

export {authToken};