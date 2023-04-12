import User from '../model/userModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Photo from '../model/photoModel.js';


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

const getDashboard = async (req, res) => {
    const photos = await Photo.find({user: res.locals.user._id}).populate([
        "followers",
        "followings"
    ]);
    res.render("dashboard", {
        link: "dashboard",
        photos
    });
}


// GET All Users

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: res.locals.user._id } });
        res.status(200).render("users", {
            link: "users",
            users
        })
    } catch (error) {
        res.status(400).json({
            succeded: false,
            error
        })
    }
}

const getAUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        const photos = await Photo.find({ user: req.params.id });
        res.status(200).render("user", {
            user,
            photos,
            link: 'users',
        })
    } catch (error) {
        res.status(400).json({
            succeded: false,
            error
        })
    }
}

const follow = async (req,res) => {
   try {
    let user = await findByIdAndUpdate(
        {_id: req.params.id},
        {
            $push: {followers: req.locals.user._id}
        },
        {new: true});  
    user = await findByIdAndUpdate(
        {_id: req.params.id},
        {
            $push: {followings: res.locals.user._id}
        },
        {new: true});
    res.status(200).json({
        succeded: true,
        user
    })
    } catch (error) {
        res.status(400).json({
            succeded: false,
            error
        })
   }
}

const unFollow = async (req,res) => {
    try {
       let user = await findByIdAndUpdate(
           {_id: req.params.id},
           { 
               $pull: {followers: res.locals.user._id}
           },
           {new: true}
       );   
       user = await findByIdAndUpdate(
           {_id: res.locals._id},
           {
               $pull: {followings: req.params.id }
           },
           {new: true}
       );
       
       res.status(200).json({
           succeded: true,
           user
       })
    } catch (error) {
        res.status(400).json({
            succeded: false,
            error
        });
    }
}

export {createUser, loginUser, getDashboard, getAllUsers, getAUser, follow, unFollow};