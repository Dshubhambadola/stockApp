/* eslint-disable class-methods-use-this */
const logger = require("pino")();
const crypto = require("crypto");
const { get } = require("lodash");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const LoginRegistration = require("../models/loginRegistration");
const UserService = require("./users");

const allUsersServices = new UserService();

const {
    JWT_SECRET, CRYPTO_SECRET, JWT_ALGORITHM, CRYPTO_ALGORITHM,
} = process.env;

const jwtSecretKey = JWT_SECRET;
const jwtExpirySeconds = 60 * 60 * 24 * 2;

class LoginRegistrationServices {
    async registration(registrationData) {
        try {
            const {
                name, mobileNo, email, password,
            } = registrationData;
            const hashedPassword = crypto.pbkdf2Sync(password, CRYPTO_SECRET, 10000, 512, CRYPTO_ALGORITHM)
                .toString("hex");

            const userDetails = await LoginRegistration.findOne({ email });
            const userExists = get(userDetails, "email", false);
            if (userExists) {
                return "Email already exists! Please Login.";
            }

            const createRegistration = new LoginRegistration({
                email,
                password: hashedPassword,
            });
            const userRegistration = await createRegistration.save();
            const userData = {
                name,
                mobileNo,
                email,
                registrationId: userRegistration._id,
            };
            await allUsersServices.createUser(userData);
            logger.info("Registrations");
            return userRegistration;
        } catch (err) {
            throw logger.error(err);
        }
    }

    async login(loginData) {
        try {
            const { email, password } = loginData;
            const userDetails = await LoginRegistration.findOne({ email });
            const hashedPassword = crypto.pbkdf2Sync(password, CRYPTO_SECRET, 10000, 512, CRYPTO_ALGORITHM)
                .toString("hex");
            const dbHashedPassword = get(userDetails, "password");
            if (dbHashedPassword === hashedPassword) {
                const userToken = jwt.sign({ email }, jwtSecretKey, {
                    algorithm: JWT_ALGORITHM,
                    expiresIn: jwtExpirySeconds,
                });
                return userToken;
            }
            return "Username or Password incorrect. Please check!";
        } catch (err) {
            throw new Error(err || "error in creating user");
        }
    }
}

module.exports = LoginRegistrationServices;
