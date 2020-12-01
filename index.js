const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const wishes = require('./src/wishes.json');

app.get(`/`, (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get(`/${md5('wishes')}`, (req, res) => {
  res.render('wishes.ejs', { wishes: wishes });
});

app.get(`/${md5('wishes')}/:id`, (req, res) => {
  res.render('wishespage.ejs');
});

app.get(`/${md5('elitewishes')}`, (req, res) => {
  res.render('elitewishes.ejs');
});

app.listen(PORT, () => {
  console.log(`[STARTING] http://localhost:${PORT}`);
  console.log(`[STARTING] http://localhost:${PORT}/${md5('wishes')}`);
  console.log(`[STARTING] http://localhost:${PORT}/${md5('elitewishes')}`);
});