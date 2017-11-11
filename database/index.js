const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGODB}`, {useMongoClient: true});
mongoose.Promise = global.Promise;

let Game = mongoose.model('Game', {board: String});

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
    Game.create({board: JSON.stringify(board)})
      .then(doc => resolve({id: doc._id, board: JSON.parse(doc.board)}))
      .catch(err => console.log('createGame error: ', err));
  });
}

module.exports.getGame = (id) => {
  return new Promise((resolve, reject) => {
    Game.findOne({_id: id})
      .then(doc => resolve({id: doc._id, board: JSON.parse(doc.board)}))
      .catch(err => console.log('getGame error: ', err));
  });
}

module.exports.saveGame = (game) => {
  return new Promise((resolve, reject) => {
    Game.findOneAndUpdate({_id: game.id}, {board: JSON.stringify(game.board)}, {new: true, upsert: true})
      .then(doc => resolve({id: doc._id, board: JSON.parse(doc.board)}))
      .catch(err => console.log('saveGame error: ', err));
  });
}