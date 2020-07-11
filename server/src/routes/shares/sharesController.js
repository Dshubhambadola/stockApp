const logger = require("pino")();
const SharesService = require("../../services/shares");

const allShareServices = new SharesService();

const sharesHealthCheck = (req, res) => {
    res.send("Healthy server man");
};

const buyShares = async (req, res) => {
    try {
        const sharesCaptured = req.body;
        await allShareServices.buyShares(sharesCaptured);
        return res.status(201).send("Shares Brought successfully");
    } catch (err) {
        throw res.status(500).send(err || "Process failed");
    }
};

const userShares = async (req, res) => {
    try {
        const userId = req.body;
        const allUserShares = await allShareServices.getUserShares(userId);
        return res.status(201).send(allUserShares);
    } catch (err) {
        throw res.status(500).send(err || "Sorry For The Inconvenience ");
    }
};
module.exports = {
    sharesHealthCheck,
    buyShares,
    userShares,
};
