import React from 'react'
import BoardView from './BoardView.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [['Rd', 'Nd', 'Bd', 'Qd', 'Kd', 'Bd', 'Nd', 'Rd'],
              ['pd', 'pd', 'pd', 'pd', 'pd', 'pd', 'pd', 'pd'],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['pl', 'pl', 'pl', 'pl', 'pl', 'pl', 'pl', 'pl'],
              ['Rl', 'Nl', 'Bl', 'Ql', 'Kl', 'Bl', 'Nl', 'Rl']]
    }

    this.getBoard('5a0640063578c225ede702d9')
      .then(game => console.log(game));
    this.sendMove('e2-e4');
  }

  getBoard(id) {
    return fetch(`/games?id=${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());;
  }

  sendMove(move) {
    return fetch('/games', {
      method: 'POST',
      body: JSON.stringify({move: move}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }



  render() {
    return (
      <div>
        <h2>en passant</h2>
        <div className="chessboard">
          <BoardView board={this.state.board} />
        </div>
      </div>
    );
  }
}

export default App