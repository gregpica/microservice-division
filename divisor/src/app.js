const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/api/v1/divisor", (req, res) => {
  const divisor = 5;
  res.json({divisor: divisor});
});


module.exports = app;