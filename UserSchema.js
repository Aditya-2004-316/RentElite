import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Invalid email format",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\+?[\d\s-]+$/, "Invalid phone number"],
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("UserSchema", userSchema);