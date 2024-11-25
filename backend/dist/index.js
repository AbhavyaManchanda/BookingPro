"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
mongoose_1.default.connect(process.env.MONGO_CONNECTION);
// mongoose.connect("mongodb+srv://manchandakhushi14:^vvrulc2q@booking-app-db.cjvo4.mongodb.net/?retryWrites=true&w=majority&appName=booking-app-db").then(()=>{
//     console.log("Mongo Connected")
// }); 
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use("/api/auth", auth_1.default); //login me authorization ki jarurat hoti hai is liye usko auth routes me register karna hai
app.use("/api/users", users_1.default);
//if any request comes into api that are prefixed with api/users,pass the request to the usersRoutes
app.listen(7000, () => {
    console.log("server running on localhost:7000");
});
