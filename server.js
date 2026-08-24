const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Catholic Faith API is running successfully ✝️"
    });
});

app.post("/api/registrations", (req, res) => {

    const {
        fullName,
        email,
        phone,
        dateOfBirth,
        gender,
        parish,
        registrationType,
        message
    } = req.body;

    console.log("New registration:");
    console.log(req.body);

    res.json({
        success: true,
        message: "Registration received successfully.",
        data: {
            fullName,
            email,
            phone,
            dateOfBirth,
            gender,
            parish,
            registrationType,
            message
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});