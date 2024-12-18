"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});
//middleware for MONGODB
//if the password has changed then bcrypt it to hash it
userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs_1.default.hash(this.password, 8);
    }
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
