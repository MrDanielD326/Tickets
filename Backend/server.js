require('dotenv').config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");
const app = express();

// Connect to Database
connectDB();

// Middleware to handle CORS
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// Serve static files from the client directory (frontend build)
app.use(express.static(path.join(__dirname, 'client')));

// Serve index.html for any non-API route (for React Router)
app.get(/^\/(?!api|uploads).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log(`🎉 - Server running on port ${PORT} - 🎉`);
    console.log("-----------------------------------------");
});
