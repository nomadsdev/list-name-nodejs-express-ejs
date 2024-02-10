const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
    
const app = express();
const PORT = process.env.PROT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'list_name'
});
  
db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.get('/', (req, res) => {
    const sql = `SELECT * FROM scores`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.render('index', { scores: results });
    });
});
  
  app.post('/add', (req, res) => {
    const { name, score } = req.body;
    const sql = `INSERT INTO scores (name, score) VALUES (?, ?)`;
    db.query(sql, [name, score], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log('Server is running');
});