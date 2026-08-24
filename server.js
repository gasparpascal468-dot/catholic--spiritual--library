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

app.get("/", (req, res) => {
    res.json({
        message: "Catholic Faith API is running successfully ✝️"
    });
});
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