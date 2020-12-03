const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const wishes = require(path.join(__dirname, 'src', 'wishes.json'));

app.get(`/`, (req, res) => {
  res.render('index.ejs');
});

app.post(`/`, (req, res) => {
  const { key } = req.body;

  if (key === 'help')
  {
    res.download(path.join(__dirname, 'public', 'images', 'wishpics', 'angel.png'));
  }
  else
  {
    axios.get(`https://api.unsplash.com/photos/random/?query=puppy&client_id=Io5T7QMnggEC-KI9KqtKH4Yez3uEdFUaon7VkOqVy-E`)
      .then(response => {
        res.redirect(response.data.urls.regular);
      });
  }
});

app.get(`/${md5('wishes')}`, (req, res) => {
  res.render('wishes.ejs', { wishes: wishes });
});

app.get(`/${md5('wishes')}/:id`, (req, res) => {
  wishes.forEach(wish => {
    if (wish.id === req.params.id)
    {
      res.render('wishespage.ejs', { wish: wish });
    }
  });
});

app.get(`/${md5('elitewishes')}`, (req, res) => {
  res.render('elitewishes.ejs');
});

app.listen(PORT, () => {
  console.log(`[STARTING] http://localhost:${PORT}`);
  console.log(`[STARTING] http://localhost:${PORT}/${md5('wishes')}`);
  console.log(`[STARTING] http://localhost:${PORT}/${md5('elitewishes')}`);
});