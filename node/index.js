const express = require('express')();
const port = 9001;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql');

const connection = mysql.createConnection(config);

const insertSQL = "INSERT INTO people (name) VALUES ('Izaltino')";
const selectSQL = "SELECT * FROM people";

connection.query(insertSQL, (err, result) => {
  if (err) throw err;
  connection.query(selectSQL, (err, rows) => {
    if (err) throw err;
    const nameList = rows.map(row => `<li>ID: ${row.id}, NAME:${row.name}</li>`).join('');
    express.get('/', (req, res) => {
      res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>
          ${nameList}
        </ul>
      `);
    });

    express.listen(port, () => {
      console.log('Rodando, porta: ', port);
    });

    connection.end();
  });
});
