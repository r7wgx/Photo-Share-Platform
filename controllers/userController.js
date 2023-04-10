import User from '../model/userModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({user: user._id})
    } catch (error) {

        console.log(error);

        let errObj = {}
        
        if(error.code === 11000) {
            Object.keys(error.keyValue).forEach((key) => {
                errObj[key] = `The ${error.keyValue[key]} is already registered`;
            });
        }
        console.log(errObj);

        if(error.name === "ValidationError") {
            Object.keys(error.errors).forEach((key) => {
                errObj[key] = error.errors[key].message;
            });
        }

        res.status(400).json({
            succeded: false,
            errObj
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        let same = false;

        if(user) {
            same = await bcrypt.compare(password, user.password); 
        } else {
            return res.status(401).json({
                succeded: false ,
                error: "There is no such user"
            })
        }

        if(same) {
            const token = createToken(user._id);
            res.cookie("JWEBToken", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            });
            res.redirect("/users/dashboard");
        } else {
            res.status(401).json({
                succeded: false,
                error: "Password wrong"
            })
        }
    } catch (error) {
        res.status(500).json({
            loginNotWorking: false,
            error
        })
    }
}

// Token create

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_TOKEN_SECRET_KEY, {
        expiresIn: "1d"
    })
} 

// GET Dashboard  

const getDashboard = (req, res) => {
    res.render("dashboard", {
        link: "dashboard"
    });
}

export {createUser, loginUser, getDashboard};