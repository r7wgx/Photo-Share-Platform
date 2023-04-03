import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const checkUser = async (req, res, next) => {
    const token = req.cookies.JWEBToken;

    if(token) {
        jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }else {
                const user = await User.findById(decodedToken.userId);
                res.locals.user = user;
                next();
            }
        }) 
    } else {
        res.locals.user = null;
        next();
    }
}

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

export {authToken, checkUser};