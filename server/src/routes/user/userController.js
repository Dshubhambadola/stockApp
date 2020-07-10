const User = require("../../models/users");

const userHealthCheck = (req, res) => {
    res.send("Healthy server man");
};

const createUser = async (userData) => {
    const {
        name, email, mobileNo, registrationId,
    } = userData;
    try {
        const newUser = new User({
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
    } catch (error) {
        throw new Error(error || "error in creating user");
    }
};

module.exports = {
    createUser,
    userHealthCheck,
};
