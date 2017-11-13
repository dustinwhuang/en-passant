const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGODB}`, {useMongoClient: true});
mongoose.Promise = global.Promise;

let Game = mongoose.model('Game', {board: String, moves: String});

const board =  [['Rd', 'Nd', 'Bd', 'Qd', 'Kd', 'Bd', 'Nd', 'Rd'],
                ['pd', 'pd', 'pd', 'pd', 'pd', 'pd', 'pd', 'pd'],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['pl', 'pl', 'pl', 'pl', 'pl', 'pl', 'pl', 'pl'],
                ['Rl', 'Nl', 'Bl', 'Ql', 'Kl', 'Bl', 'Nl', 'Rl']];

module.exports.createGame = () => {
  return new Promise((resolve, reject) => {
    Game.create({board: JSON.stringify(board), moves: JSON.stringify([])})
      .then(doc => resolve({id: doc._id, board: JSON.parse(doc.board), moves: JSON.parse(doc.moves)}))
      .catch(err => reject(err));
  });
}

module.exports.getGame = (id) => {
  return new Promise((resolve, reject) => {
    Game.findOne({_id: id})
      .then(doc => resolve({id: doc._id, board: JSON.parse(doc.board), moves: JSON.parse(doc.moves)}))
      .catch(err => reject(err));
  });
}

module.exports.saveGame = (game) => {
  return new Promise((resolve, reject) => {
    Game.findOneAndUpdate({_id: game.id}, {board: JSON.stringify(game.board), moves: JSON.stringify(game.moves)}, {new: true, upsert: true})
      .then(doc => resolve({id: doc._id, board: JSON.parse(doc.board), moves: JSON.parse(game.moves)}))
      .catch(err => reject(err));
  });
}