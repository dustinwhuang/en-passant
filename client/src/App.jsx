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
              ['Rl', 'Nl', 'Bl', 'Ql', 'Kl', 'Bl', 'Nl', 'Rl']],
      selected: false,
      square: {col: '', row: ''}
    }

    this.handleSquareClick = this.handleSquareClick.bind(this);

    this.getBoard('5a0640063578c225ede702d9')
      .then(game => this.state.board = game.board);
    this.sendMove('e2-e4');
  }

  handleSquareClick(square) {
    console.log(square.col, square.row);
    if (!this.state.selected) {
      this.setState({selected: true, square: square});
    } else {
      let board = this.state.board;
      if (square.row !== this.state.square.row || square.col !== this.state.square.col) {
        board[8 - square.row][square.col.charCodeAt() - 'a'.charCodeAt()] = board[8 - this.state.square.row][this.state.square.col.charCodeAt() - 'a'.charCodeAt()];
        board[8 - this.state.square.row][this.state.square.col.charCodeAt() - 'a'.charCodeAt()] = '';
      }
      this.setState({selected: false, board: board})
      console.log(this.state.board);
    }
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
          <BoardView board={this.state.board} handleSquareClick={this.handleSquareClick} />
        </div>
      </div>
    );
  }
}

export default App