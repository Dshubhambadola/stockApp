const crypto = require("crypto");
const { get } = require("lodash");

const LoginRegistration = require("../../models/loginRegistration");
const { createUser } = require("../user/userController");
require("dotenv").config();

const { CRYPTO_SECRET, CRYPTO_ALGORITHM } = process.env;

const registration = async (req, res) => {
    try {
        const {
            name, mobileNo, email, password,
        } = req.body;
        const hashedPassword = crypto.pbkdf2Sync(password, CRYPTO_SECRET, 10000, 512, CRYPTO_ALGORITHM).toString("hex");

        const userDetails = await LoginRegistration.findOne({ email });
        const userExists = get(userDetails, "email", false);
        if (userExists) {
            return res.status(403).send("Email already exists! Please Login.");
        }

        const createRegistration = new LoginRegistration({
            email,
            password: hashedPassword,
        });
        const registrationData = await createRegistration.save();
        const userData = {
            name,
            mobileNo,
            email,
            registrationId: registrationData._id,
        };
        await createUser(userData);
        return res.status(201).send("Registration done successfully");
    } catch (error) {
        throw res.status(500).send(error || "Registration failed");
    }
};

module.exports = {
    registration,
};
