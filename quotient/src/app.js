//const fetch = require("node-fetch");
const express = require("express");
//const bodyParser = require("body-parser");

const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();

app.use(cors());

app.use('/api/v1/quotient', graphqlHTTP({
  schema,
  graphiql: true 
}))


module.exports = app;
