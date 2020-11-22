const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(PORT, () => {
  console.log(`[STARTING] http://localhost:${PORT}`);
});