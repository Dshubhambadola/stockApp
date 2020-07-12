const express = require("express");
const http = require("http");
const path = require("path");
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

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, "../client/build")));
app.use(session({
    secret: SESSION_SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false,
}));
// app.get("/", (req, res, next) => {
//     res.sendFile(`${__dirname}/index.html`);
// });
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
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.use(require("./routes"));

// io.on("connection", (socket) => {
//     logger.info("Connected succesfully to the socket ...");
//     // socket.on("join", (data) => {
//     //     logger.info(data);
//     // });
//     socket.on("disconnect", (reason) => {
//         logger.info("Tab closed");
//     // ...
//     });
//     //
//     // const news = [
//     //     { title: "The cure of the Sadness is to play Videogames", date: "04.10.2016" },
//     //     { title: "Batman saves Racoon City, the Joker is infected once again", date: "05.10.2016" },
//     //     { title: "Deadpool doesn't want to do a third part of the franchise", date: "05.10.2016" },
//     //     { title: "Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales", date: "04.10.2016" },
//     // ];
//     //
//     // // Send news on the socket
//     // socket.emit("news", news);
//     //
//     // socket.on("news", (data) => {
//     //     logger.info(data);
//     // });
// });

// PORT to be taken from .env
server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
