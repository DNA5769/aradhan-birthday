const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(PORT, () => {
  console.log(`[STARTING] http://localhost:${PORT}`);
});