import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();
const allowedOrigins = ['https://imagify-1-a41y.onrender.com','http://localhost:5173'];

app.use(express.json())

   app.use(cors({
     origin: allowedOrigins,
     credentials: true, // if you need cookies/auth
   }));

await connectDB()
app.use("/api/user",userRouter)
app.use("/api/image",imageRouter)
app.get('/',(req,res)=>res.send("API Working"))

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
