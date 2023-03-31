import express from "express";
import dotenv from 'dotenv';
import conn from './db.js';
import pageRouter from "./routers/pageRouter.js";
import photoRouter from "./routers/photoRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const port = 3000;

dotenv.config(); // dotenv integrated

// DataBase Connection

conn();

// set template engine

app.set("view engine", 'ejs');

// middlaware

app.use(express.static('public')); // static files middleware
app.use(express.json()); // post isteyi zamani req body-den gelen datalari oxumaq ucun lazim olan middlaware
app.use(express.urlencoded({extended: true})); // 

// Router

app.use('/', pageRouter);
app.use('/photo', photoRouter);
app.use('/users', userRouter);

// server

app.listen(port, ()=> {
    console.log(`Server Run ${port}`);
})