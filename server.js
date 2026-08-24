const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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


// MongoDB connection

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });


// Home route

app.get("/", (req, res) => {

    res.json({
        message: "Catholic Faith API is running successfully ✝️"
    });

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


// Start server

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});