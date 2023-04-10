import express from "express";
import dotenv from 'dotenv';
import conn from './db.js'; // database connection
import pageRouter from "./routers/pageRouter.js";
import photoRouter from "./routers/photoRouter.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/authMiddleware.js";

const app = express();
const port = 3000;

dotenv.config(); // dotenv integrated

// DataBase Connection

conn();

// set template engine

app.set("view engine", 'ejs');

// middlaware

app.use(express.static('public')); // static files middleware
app.use(express.json()); // middlaware required to read data from req body at post request time
app.use(express.urlencoded({extended: true})); // middleware to parse the data in the form body
app.use(cookieParser());

// Router

app.use("*", checkUser);
app.use('/', pageRouter);
app.use('/photo', photoRouter);
app.use('/users', userRouter);

// server

app.listen(port, ()=> {
    console.log(`Server Run ${port}`);
})