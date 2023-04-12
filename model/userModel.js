import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isAlphanumeric, "Username can only contain letters and numbers"],
        trim: true,
        minLength: [5, "Username must be at least 5 characters"], 
    },
    email: {
        type: String, 
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        validate: [validator.isEmail, "Email is invalid"]
    },
    password: {
        type: String,
        required: [true, "password is required"] ,
        minLength: [5, "Password must be at least 5 characters"], 
    },
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: "userSchema"
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref:  "userSchema"
        }
    ]
},{
    timestamps: true
})

// end-to-end encryption of user password
userSchema.pre("save", function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next()
    })
})

const User = mongoose.model("userSchema", userSchema)

export default User;