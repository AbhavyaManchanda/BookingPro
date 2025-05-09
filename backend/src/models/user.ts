import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../shared/Types";

const userSchema=new mongoose.Schema({
    email:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
});


//middleware for MONGODB
//if the password has changed then bcrypt it to hash it
userSchema.pre("save",async function(next){

    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,8)
    }
    next();
    
});

const User=mongoose.model<UserType>("User",userSchema);

export default User;