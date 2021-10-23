'use strict';

const express = require('express');
const path = require('path');
const app = express();

// Lets us get the data from a POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Adds headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

var apiRouter = require('./api')
app.use('/api', apiRouter);

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

//Choose our port and launch the server
let PORT = 8999;
if(process.env.NODE_ENV == 'production'){
  PORT = 80;
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
