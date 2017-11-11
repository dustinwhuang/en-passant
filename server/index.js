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

let idsRequested = {};

app.post('/games', (req, res) => {
  console.log('post /games body: ', req.body);
  db.saveGame(req.body)
    .then(game => res.send(game));
    idsRequested[req.body.id] = new Date();
    console.log('save date', idsRequested[req.body.id]);
});

app.get('/games', (req, res) => {
  console.log('get /games query: ', req.query);
  console.log('date', req.query.updatedAt, idsRequested[req.query.id])
  if (req.query.id === 'undefined') {
    db.createGame()
      .then(game => res.send(game));
  } else if (idsRequested[req.query.id] === undefined || req.query.updatedAt < idsRequested[req.query.id]) {
    console.log('query db');
    db.getGame(req.query.id)
      .then(game => res.send({id: game.id, board:game.board, updatedAt: new Date()}));
  } else {
    res.end();
  }
});


app.listen(process.env.PORT || 3000, () => console.log(`listening on  port ${process.env.PORT || 3000}`));