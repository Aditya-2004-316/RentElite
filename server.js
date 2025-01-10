import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authentication.js";
import vehicleRoutes from "./routes/BackendVehicles.js";
import bookingRoutes from "./routes/bookings.js";
import paymentRoutes from "./routes/payments.js";

// Load env vars
dotenv.config();

// Validate required env vars
if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is required");
    process.exit(1);
}

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());

// Connect to database
console.log("Attempting to connect to MongoDB...");
try {
    await connectDB();
    console.log("Database connection successful");
} catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on("error", (error) => {
    console.error("Server failed to start:", error);
});
