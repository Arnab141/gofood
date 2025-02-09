// const express = require('express');
import express from 'express';
import cors from 'cors';
import bodyParser from 'express';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'





const port= process.env.PORT || 4000;
const app=express();


//use middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

//connect db
connectDB();

//api endpoint

app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);



app.get('/',(req,res)=>{
    res.send("Api working");
})



app.listen(port,()=>{
    console.log("server start on http://localhost",port);
})

