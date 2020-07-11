const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const schema = new Schema({
    companyName: {
        type: String,
    },
    userId: {
        type: ObjectId,
        index: true,
        required: true,
    },
    shareName: {
        type: String,
    },
    shareId: {
        type: ObjectId,
        index: true,
        required: true,
    },
    shareValue: {
        type: Number,
        required: true,
    },
}, {
    collection: "Sharesbroughtby",
    timestamps: true,
});

const SharesBroughtby = mongoose.model("Sharesbroughtby", schema);
module.exports = SharesBroughtby;
