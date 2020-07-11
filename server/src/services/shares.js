/* eslint-disable class-methods-use-this */
const logger = require("pino")();
const SharesBroughtBy = require("../models/sharesBroughtBy");

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

    async getUserShares(userId) {
        try {
            const userShares = await SharesBroughtBy.findOne({ userId });
            return userShares;
        } catch (err) {
            throw logger.error(err);
        }
    }
}

module.exports = ShareServices;
