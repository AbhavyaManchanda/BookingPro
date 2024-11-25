"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
//  import verifyToken from "../middleware/auth";
const router = express_1.default.Router();
//if user route is api/user/register then this is used..for registering a new user
router.post("/register", [
    //middleware for validation
    //uses express validator library
    (0, express_validator_1.check)("firstName", "First Name is required").isString(), //its checking if firstname exists in the body of request..and if it is string
    //is string..validation method hai
    (0, express_validator_1.check)("lastName", "Last Name is required").isString(),
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password with 6 or more characters required").isLength({
        min: 6,
    }),
], 
//route handler
//validation result is passed to the next middleware
//proccesses an incoming request and sends a response
async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        //if error exists,status is sent with array of msgs
        return res.status(400).json({ message: errors.array() });
    }
    try {
        let user = await user_1.default.findOne({
            email: req.body.email,
        });
        //to prevent duplicate user registrations
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        user = new user_1.default(req.body);
        await user.save();
        //creates a json web token containing user id
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, //secret key used for token signing
        { expiresIn: "1d" });
        res.cookie("auth_token", token, {
            httpOnly: true, //making cookie inaccessible to javascript on client-side
            secure: process.env.NODE_ENV === "production", //ensures the cookie is only sent over HTTPS in production.
            maxAge: 86400000,
        });
        return res.status(200).send({ message: "User registered OK" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.default = router;
