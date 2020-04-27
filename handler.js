const serverlessHTTP = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'todo_db',
  connectionLimit: 10,
});


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', (request, response) => {
  pool.query('SELECT * FROM tasks', (err, data) => {
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

  // get data to be entered into db
  const data = request.body;

  const query = 'INSERT INTO tasks (task, type_id, due_date, user_id) VALUES (?, ?, ?, ?)';
  pool.query(query, [data.task, data.type_id, data.due_date, data.user_id], (err, results) => {
    if (err) {
      console.log('Error from MySQL', err);
      response.status(500).send(err);
    } else {

      pool.query(`SELECT * FROM tasks WHERE task_id = ${results.insertId}`, (err, results) => {
        if (err) {
          console.log('Error from MySQL', err);
          response.status(500).send(err);
        } else {
          response.status(201).send(results[0]);
        }
      })
    }
  });
});

app.delete('/tasks/:id', (request, response) => {
  const id = request.params.id;
  response.status(200).send(`Task  ${id} deleted`);
});

module.exports.app = serverlessHTTP(app);
