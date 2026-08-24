const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const Registration = mongoose.model(
    "Registration",
    new mongoose.Schema({
        fullName: String,
        email: String,
        phone: String,
        dateOfBirth: String,
        gender: String,
        parish: String,
        registrationType: String,
        message: String
    })
);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve your website files
app.use(express.static(__dirname));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

// Homepage - show the Catholic website
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Registration route
app.post("/api/registrations", async (req, res) => {

    try {

        const registration =
            await Registration.create(req.body);

        res.json({

            success: true,

            message: "Registration saved successfully.",

            id: registration._id

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Could not save registration."

        });

    }

});

// API test
app.get("/api", (req, res) => {
    res.json({
        message: "Catholic Faith API is running successfully ✝️"
    });
});

// Start server
app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});