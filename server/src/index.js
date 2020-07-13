const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const server = http.createServer(app);
global.io = require("socket.io")(server);
require("./jobs/shares");

const logger = require("pino")();
require("dotenv").config();

const {
    MONGODB_URI, PORT, SESSION_SECRET,
} = process.env;

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
app.use(session({
    secret: SESSION_SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false,
}));
// Configure mongoose

mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
const db = mongoose.connection;
db.on("error", (error) => {
    logger.error("Mongoose error", error);
});
db.once("open", async () => {
    logger.info("Connected to mongoose");
});
app.use(require("./routes"));

// PORT to be taken from .env
server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
