import express from "express";
import dotenv from 'dotenv';
import conn from './db.js'; // database connection
import pageRouter from "./routers/pageRouter.js";
import photoRouter from "./routers/photoRouter.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import { checkUser } from "./middlewares/authMiddleware.js";
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from "cloudinary";

dotenv.config(); // dotenv integrated

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const app = express();
const port = 3000;


// DataBase Connection

conn();

// set template engine

app.set("view engine", 'ejs');

// middlaware

app.use(express.static('public')); // static files middleware
app.use(express.json()); // middlaware required to read data from req body at post request time
app.use(express.urlencoded({extended: true})); // middleware to parse the data in the form body
app.use(cookieParser()); // middleware to parse the cookie
app.use(fileUpload({ useTempFiles: true })); 
app.use(
    methodOverride('_method', {
      methods: ['POST', 'GET'],
    })
  );

// Router

app.use("*", checkUser);
app.use('/', pageRouter);
app.use('/photo', photoRouter);
app.use('/users', userRouter);

// server

app.listen(port, ()=> {
    console.log(`Server Run http://localhost:${port}`);
})