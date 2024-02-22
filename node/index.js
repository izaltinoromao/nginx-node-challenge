const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'nodedb',
};

app.get('/', (_req, res) => {
  InsertName(res);
});

app.listen(PORT, () => {
  console.log(`Application running on Port...: ${PORT} 🚀`);
});

async function InsertName(res) {
  const connection = mysql.createConnection(dbConfig);
  const INSERT_QUERY = `INSERT INTO people(name) values('Izaltino')`;

  connection.query(INSERT_QUERY, (error, _results, _fields) => {
    if (error) {
      console.log(`Error inserting name: ${error}`);
      res.status(500).send('Error inserting name');
      return;
    }

    console.log(`Izaltino inserted successfully in the database!`);
    getAll(res, connection);
  });
}

function getAll(res, connection) {
  const SELECT_QUERY = `SELECT id, name FROM people`;

  connection.query(SELECT_QUERY, (error, results) => {
    if (error) {
      console.log(`Error getting people: ${error}`);
      res.status(500).send('Error getting people');
      return;
    }

    const tableRows = results
      .map(
        (person) => `
        <tr>
          <td>${person.id}</td>
          <td>${person.name}</td>
        </tr>
      `
      )
      .join('');
    const table = `
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>${tableRows}
      </table>`;

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      ${table}
    `);

    connection.end();
  });
}