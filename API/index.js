import express from "express";
import dotenv  from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from './routes/userRoute.js';
import blogRouter from './routes/blogRoute.js';
import productRouter from './routes/productRoute.js';
import searchRouter from './routes/searchRoute.js';
import mongoose from "mongoose";
import path from 'path'
dotenv.config();



const app = express();
app.use(cookieParser());
app.use(express.json());


const __dirname=path.resolve()
app.use('/api/user',userRouter)
app.use('/api/blogs',blogRouter)
app.use('/api/product',productRouter)
app.use('/api/search',searchRouter)




try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDb is connected succesfully");
} catch (error) {
  console.log("error occured during Mongodb connection");
}

app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})


//middleware for handling errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 404;
  const message = err.message || "something went wrong";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
