const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const logger = require("pino")();
require("dotenv").config();

const {
    MONGODB_URI, PORT, SESSION_SECRET,
} = process.env;

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
    );
    next();
});
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(session({
    secret: SESSION_SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false,
}));

// Configure mongoose

mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
const db = mongoose.connection;
db.on("error", (error) => {
    logger.error("Mongoose error", error);
});
db.once("open", async () => {
    logger.info("Connected to mongoose");
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// app.use(require("./routes"));

// PORT to be taken from .env
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
