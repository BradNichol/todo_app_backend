const serverlessHTTP = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-paser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'todo_db',
});


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', (request, response) => {
  connection.query('SELECT * FROM tasks', (err, data) => {
    if (err) {
      console.log('Error from MySQL', err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

// update tasks
app.put('/tasks/:id', (request, response) => {
  const id = request.params.id;
  response.status(200).send(`Task with id: ${id}updated`);
});

// add new task
app.post('/tasks', (request, response) => {
  const query = 'INSERT INTO tasks () VALUES (?, ?, ?)';
  connection.query(query, (err, data) => {
    if (err) {
      console.log('Error from MySQL', err);
      response.status(500).send(err);
    } else {
      response.status(201).send(`Task of ${data.text} added`);
    }
  });
});

app.delete('/tasks/:id', (request, response) => {
  const id = request.params.id;
  response.status(200).send(`Task  ${id} deleted`);
});

module.exports.app = serverlessHTTP(app);
