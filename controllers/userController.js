import User from '../model/userModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            user,
            succeded: true
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
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
            res.status(200).json({
                user,
                token: createToken(user._id)
            })
        } else {
            res.status(401).json({
                succeded: false,
                error: "Password wrong"
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

// JWT

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_TOKEN_SECRET_KEY, {
        expiresIn: "1d"
    })
} 

export {createUser, loginUser};