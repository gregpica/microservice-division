const express = require("express");
const bodyParser = require("body-parser");

const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();

app.use(bodyParser.json());

// app.get("/api/v1/divisor", (req, res) => {
//   const divisor = 5;
//   res.json({divisor: divisor});
// });

app.use(cors());

app.use('/api/v1/divisor', graphqlHTTP({
  schema,
  graphiql: true 
}))

module.exports = app;