/* eslint-disable class-methods-use-this */
const { CronJob } = require("cron");
const Shares = require("../models/shares");
const SharesService = require("../services/shares");

const allShareServices = new SharesService();
class SharesJobs {
    async getShares() {
        const job = new CronJob("*/10 * * * * *", (async () => {
            allShareServices.getAllSharesAndUpdate();
        }));
        job.start();
    }
}

const Share = new SharesJobs();
Share.getShares();
