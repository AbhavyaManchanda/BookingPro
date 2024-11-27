import express,{Request,Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
 

const router=express.Router();


router.get("/me", verifyToken, async (req: Request, res: Response) => {
    const userId = req.userId;
  
    try {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  });
  


//if user route is api/user/register then this is used..for registering a new user
router.post("/register", [
    //middleware for validation
    //uses express validator library
    check("firstName", "First Name is required").isString(),//its checking if firstname exists in the body of request..and if it is string
    //is string..validation method hai
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
],
//route handler
//validation result is passed to the next middleware
//proccesses an incoming request and sends a response
async (req: Request, res: Response) => {
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        //if error exists,status is sent with array of msgs
        return res.status(400).json({message: errors.array() });
    }
    try{
        let user=await User.findOne({
            email:req.body.email,
        });

        //to prevent duplicate user registrations
        if(user){
            return res.status(400).json({
                message:"User already exists"
            });
        }


        user=new User(req.body);
        await user.save();

        //creates a json web token containing user id
        const token=jwt.sign(
            {userId:user.id},
            process.env.JWT_SECRET_KEY as string, //secret key used for token signing
            {expiresIn:"1d"}
        );
         

        res.cookie("auth_token",token,{
            httpOnly:true,//making cookie inaccessible to javascript on client-side
            secure:process.env.NODE_ENV==="production",//ensures the cookie is only sent over HTTPS in production.
            maxAge:86400000,
        })
        return res.status(200).send({message:"User registered OK"})


     }catch(error){
        console.log(error);
        res.status(500).send({message:"Something went wrong"})

     }

});
export default router;