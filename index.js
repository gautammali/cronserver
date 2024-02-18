const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");
const http = require("http");
const axios = require('axios')
// const linkedln_callback = require('./routes/linkedln_callback');

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).send("ok");
});

app.get("/health", (req, res, next) => {
  res.status(200).send("ok");
});

async function logMessage() {
  console.log("Cron job executed at:", new Date().toLocaleString());
  const options = {
    url: "https://linkedlnloginserver.onrender.com/verify",
    method: "GET",
    headers: {
        "Content-Type" : 'application/json'
    },
  };

  const optionss = {
    url: "https://cronserver.onrender.com",
    method: "GET",
    headers: {
        "Content-Type" : 'application/json'
    },
  };

  const result = await axios(options)
  const result2 = await axios(optionss)
  console.log(result2.data)
  console.log(result.data)
  console.log("Cron job executed at:", new Date().toLocaleString());
}

cron.schedule("*/5 * * * *", () => {
  logMessage();
});

app.get("/verify", (req, res, next) => {
  res.status(200).json({ applicationHealth: "100", message: "verified" });
});

app.listen(process.env.PORT || 3007, () => {
  console.log("listening on port", process.env.PORT || 3007);
});
