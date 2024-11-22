import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from "cookie-parser";




// mongoose.connect(process.env.MONGO_CONNECTION as string); 
mongoose.connect("mongodb+srv://manchandakhushi14:Abhavya5816@booking-app-db.cjvo4.mongodb.net/?retryWrites=true&w=majority&appName=booking-app-db");


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));

app.use("/api/users",userRoutes);

app.listen(7000, () => {
    console.log("server running on localhost:7000");
});
