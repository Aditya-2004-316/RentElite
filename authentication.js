import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserSchema from "../models/UserSchema.js";

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;

        // Check if user exists
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const user = new UserSchema({
            email,
            password: hashedPassword,
            name,
            phone,
        });

        await user.save();

        // Create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
