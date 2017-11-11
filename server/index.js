const express = require('express');
const parser = require('body-parser');
const db = require('../database');

const app = express();

app.use(express.static(__dirname + '/../client/public'));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


app.post('/games', (req, res) => {
  console.log('post /games body: ', req.body);
});

app.get('/games', (req, res) => {
  console.log('get /games query: ', req.query);
  if (req.query.id === 'undefined') {
    db.createGame()
      .then(game => res.send(game));
  }

});


app.listen(process.env.PORT || 3000, () => console.log(`listening on  port ${process.env.PORT || 3000}`));