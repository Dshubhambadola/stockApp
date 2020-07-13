const SharesService = require("../../services/shares");

const allShareServices = new SharesService();

const sharesHealthCheck = (req, res) => {
    res.send("Healthy server man");
};

const buyShares = async (req, res) => {
    try {
        const sharesCaptured = req.body;
        const { user: userEmail } = req;
        await allShareServices.buyShares({ ...sharesCaptured, userEmail });
        return res.status(201).send("Shares Brought successfully");
    } catch (err) {
        throw res.status(500).send(err || "Process failed");
    }
};

const userShares = async (req, res) => {
    try {
        const { user } = req;
        const allUserShares = await allShareServices.getUserShares(user);
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
