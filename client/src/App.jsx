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

    setInterval(() => this.getBoard(props.match.params.id), 500);
  }

  handleSquareClick(square) {
    let board = this.state.board;
    const col = square.col.charCodeAt() - 'a'.charCodeAt();
    const row = 8 - square.row;

    console.log(square.col, square.row, board[row][col]);
    if (!this.state.selected && board[row][col] !== '') {
      board[row][col] = `(${board[row][col]})`;
      this.setState({selected: true, square: square, board: board});
    } else if (this.state.selected) {
      if (square.row !== this.state.square.row || square.col !== this.state.square.col) {
        board[row][col] = /[RNBQKp][dl]/.exec(board[8 - this.state.square.row][this.state.square.col.charCodeAt() - 'a'.charCodeAt()])[0];
        board[8 - this.state.square.row][this.state.square.col.charCodeAt() - 'a'.charCodeAt()] = '';
        this.sendBoard();
      } else {
        board[row][col] = /[RNBQKp][dl]/.exec(board[row][col])[0];
      }
      this.setState({selected: false, board: board})
    }
      console.log(this.state.board);
  }

  getBoard(id) {
    return fetch(`/games?id=${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(game => this.setState({board: game.board}))
    .catch(() => {/* Wait for update */});
  }

  sendBoard() {
    return fetch('/games', {
      method: 'POST',
      body: JSON.stringify({id: this.props.match.params.id, board: this.state.board}),
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