var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';


//Routes
router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done){
    if (err) {
      res.sendState(500);
    }

    client.query('SELECT * FROM tasklist', function (err, result) {
      done();
      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var task = req.body;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO tasklist (task_name, task_deadline) ' +
                  'VALUES ($1, $2)',
                   [task.task_name, task.deadline],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(201);
                 });
  });
});

module.exports = router;
