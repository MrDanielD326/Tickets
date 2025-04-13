require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const app = express();

const authRoutes = require("./routes/authRoutes");

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));