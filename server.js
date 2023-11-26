import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.js'
import blogRouter from './routes/blog.js'
import { config } from "dotenv";
import cors from "cors";

const app = express();



app.use(express.json())  //so that the servers knows we are using the JSON data
app.use(cookieParser()) 
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

config({
    path:'./data/config.env'
})

app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)

mongoose.connect(process.env.MONGO_URL,{
    dbName:"Blog_DB"
}).then(()=>console.log("Database is connected"));

app.listen(process.env.PORT,()=>console.log(`Listening on ${process.env.PORT}`));