const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get("/api/v1/dividend", (req, res) => {
  //Will later add db
  const dividend = 10;
  res.json({ dividend: dividend });
});

module.exports = app;



