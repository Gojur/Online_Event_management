const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test whether request body is received
app.post("/test", (req, res) => {
    console.log("Received body:", req.body);

    res.json({
        message: "Body received successfully",
        body: req.body
    });
});

// Authentication routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const eventRoutes = require("./routes/eventRoutes");

app.use("/api/events", eventRoutes);

const registrationRoutes =
    require("./routes/registrationRoutes");

app.use(
    "/api/registrations",
    registrationRoutes
);
// Home route
app.get("/", (req, res) => {
    res.send("Online Event Management System API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});