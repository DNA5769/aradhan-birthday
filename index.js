const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get(`/`, (req, res) => {
  res.render('elitewishes.ejs');
});

app.get(`/${md5('wishes')}`, (req, res) => {
  res.render('wishes.ejs');
});

app.listen(PORT, () => {
  console.log(`[STARTING] http://localhost:${PORT}`);
  console.log(`[STARTING] http://localhost:${PORT}/${md5('wishes')}`);
});