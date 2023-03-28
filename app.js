import express from "express";
import dotenv from 'dotenv';
import conn from './db.js';
import pageRouter from "./routers/pageRouter.js";

const app = express();
const port = process.env.PORT;

dotenv.config() // dotenv integrated

// DataBase Connection

conn();

// set template engine

app.set("view engine", 'ejs')

// static files middleware

app.use(express.static('public'));

// Router

app.use('/', pageRouter)


// server

app.listen(port, ()=> {
    console.log(`Server Run ${port}`);
})