import React from 'react'
import BoardView from './BoardView.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', '']],
      style: [['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', '']],

      updatedAt: 0,
      selected: false,
      square: {col: '', row: ''},
      interval: null
    }

    this.handleSquareClick = this.handleSquareClick.bind(this);
console.log(props.match.params.id);
    this.getBoard(props.match.params.id);
    this.state.interval = setInterval(() => this.getBoard(props.match.params.id), 500);
  }

  handleSquareClick(square) {
    let board = this.state.board;
    let style = this.state.style;
    const col = square.col.charCodeAt() - 'a'.charCodeAt();
    const row = 8 - square.row;
    const sqCol = this.state.square.col.charCodeAt() - 'a'.charCodeAt();
    const sqRow = 8 - this.state.square.row;

    console.log(square.col, square.row, board[row][col]);
    if (!this.state.selected && board[row][col] !== '') {
      style[row][col] = '@';
      this.setState({selected: true, square: square, style: style});
    } else if (this.state.selected) {
      if (square.row !== this.state.square.row || square.col !== this.state.square.col) {
        style[sqRow][sqCol] = '';
        board[row][col] = board[sqRow][sqCol];
        board[sqRow][sqCol] = '';
        this.sendBoard();
      } else {
        style[row][col] = '';
      }
      this.setState({selected: false, board: board, style: style})
    }
      console.log(this.state.board);
  }

  getBoard(id) {
    return fetch(`/games?id=${id}&updatedAt=${this.state.updatedAt}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response =>  {
        // Redirect if game not found
        if (response.status !== 200) {
          clearInterval(this.state.interval);
          this.props.history.push('/');
        } else {
          return response.json();
        }
      })
      .then(game => this.setState({board: game.board, updatedAt: game.updatedAt}))
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
          <BoardView board={this.state.board} style={this.state.style} handleSquareClick={this.handleSquareClick} />
        </div>
      </div>
    );
  }
}

export default App