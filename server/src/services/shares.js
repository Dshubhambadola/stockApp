/* eslint-disable class-methods-use-this */
const logger = require("pino")();
const Promise = require("bluebird");
const SharesBroughtBy = require("../models/sharesBroughtBy");
const Shares = require("../models/shares");

const newSocket = global.io;
let globalSocket;
newSocket.on("connection", (socket) => {
    logger.info("Connected succesfully to the socket ...");
    globalSocket = socket;
});

class ShareServices {
    async buyShares(sharesCaptureDetails) {
        try {
            const sharesBrought = new SharesBroughtBy(sharesCaptureDetails);
            const shareBroughtData = await sharesBrought.save();
            logger.info("shares brought");
            return shareBroughtData;
        } catch (err) {
            throw logger.error(err);
        }
    }

    async getUserShares(userEmail) {
        try {
            const userShares = await SharesBroughtBy.findOne({ userEmail });
            return userShares;
        } catch (err) {
            throw logger.error(err);
        }
    }

    async getAllSharesAndUpdate() {
        try {
            const allSharesData = await Shares.find({});
            const updatedData = await Promise.map(allSharesData, async (eachSharesData) => {
                const { shareId } = eachSharesData;
                const newShareValue = Math.floor(Math.random() * 100);
                const filter = { shareId };
                const update = { shareValue: newShareValue };
                const updateShareValue = await Shares.findOneAndUpdate(filter, update, {
                    new: true,
                });
                return updateShareValue;
            });
            // globalSocket.emit("sharesData", updatedData);
        } catch (err) {
            throw logger.error(err);
        }
    }
}

module.exports = ShareServices;
