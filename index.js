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

  if (key === '06/12/01')
  {
    res.download(path.join(__dirname, 'src', 'puzzles', 'Instructions.txt'));
  }
  else if (key.toLowerCase() === 'I love you, Dennis'.toLowerCase())
  {
    res.download(path.join(__dirname, 'src', 'puzzles', 'Puzzle 1.zip'));
  }
  else if (key.toLowerCase() === 'Sugar Donut'.toLowerCase())
  {
    res.download(path.join(__dirname, 'src', 'puzzles', 'Puzzle 2.zip'));
  }
  else if (key.toLowerCase() === 'Eminem'.toLowerCase())
  {
    res.download(path.join(__dirname, 'src', 'puzzles', 'Puzzle 3.zip'));
  }
  else if (key.toLowerCase() === 'D.N.A.'.toLowerCase())
  {
    res.download(path.join(__dirname, 'src', 'puzzles', 'Puzzle 4.zip'));
  }
  else if (key.toLowerCase() === '9'.toLowerCase())
  {
    res.download(path.join(__dirname, 'src', 'puzzles', 'Puzzle 5.zip'));
  }
  else if (key.toLowerCase() === 'Python is better than Java'.toLowerCase())
  {
    res.redirect(`/${md5('wishes')}`);
  }
  else if (key.toLowerCase() === 'You'.toLowerCase())
  {
    res.redirect(`/${md5('mywish')}`);
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

app.get(`/${md5('mywish')}`, (req, res) => {
  res.render('mywish.ejs');
});

app.get(`/${md5('wishes')}/:id`, (req, res) => {
  wishes.forEach(wish => {
    if (wish.id === req.params.id)
    {
      res.render('wishespage.ejs', { wish: wish });
    }
  });
});

app.listen(PORT, () => {
  console.log(`[STARTING] http://localhost:${PORT}`);
});