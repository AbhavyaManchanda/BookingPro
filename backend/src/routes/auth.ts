import express,{Request , Response} from "express";
import {check,validationResult} from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";



const router =express.Router();

router.post("/login",
  [  
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
],async(req: Request, res: Response)=>{//funct to handle requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
}

const { email, password } = req.body;
//de-structuring the email and password from the request body

try {
  //fetching the user
    const user = await User.findOne({ email });
    if (!user) { //if user dosn't exist
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //comparing the password
    // to check the password we send for the req matches the password we have for user 
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    res.status(200).json({ userId: user._id });



} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
  });
  

  router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
      expires: new Date(0),
    });
    res.send();
  });
  
  export default router;