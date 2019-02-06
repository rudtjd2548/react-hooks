const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const schema = require('./graphql/schema');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  '/graphql',
  graphqlHttp({
    schema,
    graphiql: true
  })
);

//app.use(express.static(path.join(__dirname, 'dist')));

app.listen(3000);
