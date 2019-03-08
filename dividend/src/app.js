const express = require('express');
const bodyParser = require('body-parser');

const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');


const app = express();

app.use(bodyParser.json());

// app.get("/api/v1/dividend", (req, res) => {
//   //Will later add db
//   const dividend = 10;
//   res.json({ dividend: dividend });
// });
app.use(cors());

app.use('/api/v1/dividend', graphqlHTTP({
  schema,
  graphiql: true 
}))

module.exports = app;



