import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';


// mongoose.connect(process.env.MONGO_CONNECTION as string); 
mongoose.connect("mongodb+srv://manchandakhushi14:Abhavya5816@booking-app-db.cjvo4.mongodb.net/?retryWrites=true&w=majority&appName=booking-app-db"); 

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api/users",userRoutes);

app.listen(7000,()=>{
    console.log("server running on localhost:7000");
});



