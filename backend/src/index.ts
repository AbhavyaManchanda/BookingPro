import express,{Request,Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import bookingRoutes from "./routes/my-bookings";


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

mongoose.connect(process.env.MONGO_CONNECTION as string); 
// mongoose.connect("mongodb+srv://manchandakhushi14:^vvrulc2q@booking-app-db.cjvo4.mongodb.net/?retryWrites=true&w=majority&appName=booking-app-db").then(()=>{
//     console.log("Mongo Connected")
// }); 

const app=express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
})
);


app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.use("/api/auth",authRoutes);//login me authorization ki jarurat hoti hai is liye usko auth routes me register karna hai
app.use("/api/users",userRoutes);
//if any request comes into api that are prefixed with api/users,pass the request to the usersRoutes


app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings",bookingRoutes);


app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
  

app.listen(7000,()=>{
    console.log("server running on localhost:7000");
});



