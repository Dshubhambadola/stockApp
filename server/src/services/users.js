/* eslint-disable class-methods-use-this */
const logger = require("pino")();

const Users = require("../models/users");

class UserServices {
    async createUser(usersData) {
        try {
            const {
                name, email, mobileNo, registrationId,
            } = usersData;
            const newUser = new Users({
                name,
                email,
                mobileNo,
                registrationId,
            });
            await newUser.save();
            return {
                status: "200",
                message: "Success",
            };
        } catch (err) {
            throw logger.error(err);
        }
    }
}

module.exports = UserServices;
