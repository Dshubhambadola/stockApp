const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const schema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    companyId: {
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
    collection: "shares",
    timestamps: true,
});

const Share = mongoose.model("Share", schema);
module.exports = Share;
