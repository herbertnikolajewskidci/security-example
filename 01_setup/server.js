const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const helmet = require("helmet");

const PORT = 3000;
const config = {
    CLIENT_ID:
        "834957504089-dvq89dqacmgmloqhc8uqahn0lgqmf5cm.apps.googleusercontent.com",
    CLIENT_SECRET: "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",
};

const app = express();

app.use(helmet());

function checkLoggedIn(req, res, next) {
    const isLoggedIn = true; //TODO
    if (!isLoggedIn) {
        return res.status(401).json({
            error: "You must log in!",
        });
    }
    next();
}

app.get("/auth/google", (req, res) => {});

app.get("/auth/google/callback", (req, res) => {});

app.get("/auth/logout", (req, res) => {});

app.get("/secret", checkLoggedIn, (req, res) => {
    return res.send("Your personal secret value is 42!");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
    .createServer(
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
        app
    )
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
