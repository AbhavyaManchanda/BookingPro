
import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';


// mongoose.connect(process.env.MONGO_CONNECTION as string); 
mongoose.connect("mongodb+srv://manchandakhushi14:^vvrulc2q@booking-app-db.cjvo4.mongodb.net/?retryWrites=true&w=majority&appName=booking-app-db").then(()=>{
    console.log("Mongo Connected")
}); 

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
//if any request comes into api that are prefixed with api/users,pass the request to the usersRoutes

app.listen(7000,()=>{
    console.log("server running on localhost:7000");
});



