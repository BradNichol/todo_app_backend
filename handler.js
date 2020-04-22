'use strict';

const serverlessHTTP = require('serverless-http');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())

app.get('/tasks', function (request, response) {

  response.status(200).send('Hello from API');
});

app.put('/tasks/:id', function (request, response) {

  response.status(200).send('Task completed');
});

app.post('/tasks', function (request, response) {

  response.status(201).send('Task added');
});

app.delete('/tasks/:id', function (request, response) {

  const id = request.params.id;
  response.status(200).send(`Task  ${id} deleted`);
});

module.exports.app = serverlessHTTP(app);