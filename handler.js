'use strict';

const serverlessHTTP = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-paser');


const app = express();
app.use(cors())

app.get('/tasks', function (request, response) {

  response.status(200).send('Hello from API');
});

app.put('/tasks/:id', function (request, response) {
  const id = request.params.id;
  const data 
  response.status(200).send('Task updated');
});

app.post('/tasks', function (request, response) {
  const data = request.body;
  response.status(201).send(`Task of ${data.text} added`);
});

app.delete('/tasks/:id', function (request, response) {

  const id = request.params.id;
  response.status(200).send(`Task  ${id} deleted`);
});

module.exports.app = serverlessHTTP(app);