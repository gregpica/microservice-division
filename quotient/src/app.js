const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/api/v1/quotient", async (req, res) => {
  try {
    const dividendPromise = fetch("http://dividend:3000/api/v1/dividend");
    const divisorPromise = fetch("http://divisor:3000/api/v1/divisor");
    const promises = [dividendPromise, divisorPromise];
    const [dividendResponse, divisorResponse] = await Promise.all(promises);
    const dividendJson = await dividendResponse.json();
    const divisorJson = await divisorResponse.json();
    const { dividend } = dividendJson
    const { divisor } = divisorJson
    const quotient = dividend / divisor;

    res.json({ quotient: quotient });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = app;
