import React from 'react'
import BoardView from './BoardView.jsx'
import MovesView from './MovesView.jsx'
import {findPaths} from './Pathing.js'

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
      style: null,
      clearStyles: null,
      updatedAt: 0,
      selected: false,
      square: {col: '', row: ''},
      interval: null,
      moves: [],
      settings: {expanded: false, flipped: false, paths: true, moves: false}
    }
    this.state.style = JSON.parse(JSON.stringify(this.state.board));
    this.state.clearStyles = JSON.stringify(this.state.board);

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);

    this.getBoard(props.match.params.id);
    this.state.interval = setInterval(() => this.getBoard(props.match.params.id), 500);
  }

  handleSquareClick(square) {
    let board = this.state.board;
    let style = this.state.style;
    let moves = this.state.moves;
    const col = square.col.charCodeAt() - 'a'.charCodeAt();
    const row = 8 - square.row;
    const sqCol = this.state.square.col.charCodeAt() - 'a'.charCodeAt();
    const sqRow = 8 - this.state.square.row;

    console.log(square.col, square.row, board[row][col]);
    if (!this.state.selected && board[row][col][1] === ['l', 'd'][moves.length % 2]) {
      style[row][col] = '@';
      this.setState({selected: true, square: square, style: style});
      this.highlightPaths(row, col);
    } else if (this.state.selected) {
      if (/[\*!%]/.test(style[row][col]) && (square.row !== this.state.square.row || square.col !== this.state.square.col)) {
        let start = `${(/[RNBQK]/.exec(board[sqRow][sqCol]) || [''])[0]}${this.state.square.col}${this.state.square.row}`;
        let finish = `${board[row][col] ? 'x' : '-'}${(/[RNBQK]/.exec(board[row][col]) || [''])[0]}${square.col}${square.row}`;
        console.log(start + finish);
        moves = this.state.moves.concat(start + finish);
        console.log(this.state.moves);
        board[row][col] = board[sqRow][sqCol];
        board[sqRow][sqCol] = '';
        if (style[row][col] === '%') {  //en passant
          board[sqRow][col] = '';
        }
        this.sendBoard(board, moves);
      }
      this.setState({selected: false, board: board, moves: moves, style: JSON.parse(this.state.clearStyles)})
    }
  }

  highlightPaths(row, col) {
    let board = this.state.board;
    let style = this.state.style;
    let moves = this.state.moves;

    findPaths(row, col, board, style, moves);

    this.setState({style: style});
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
      .then(game => this.setState({board: game.board, moves: game.moves, updatedAt: game.updatedAt}))
      .catch(() => {/* Wait for update */});
  }

  sendBoard(board, moves) {
    console.log(this.state.moves);
    return fetch('/games', {
      method: 'POST',
      body: JSON.stringify({id: this.props.match.params.id, board: board, moves: moves}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }



  showSettings() {
    if (!this.state.settings.expanded) {
      document.getElementById('settings-menu').style.display = 'block';
      this.setState({settings: Object.defineProperty(this.state.settings, 'expanded', {value: true})});
    } else {
      document.getElementById('settings-menu').style.display = 'none';
      this.setState({settings: Object.defineProperty(this.state.settings, 'expanded', {value: false})});
    }
  }

  toggleSettings(e) {
    this.setState({settings: Object.defineProperty(this.state.settings, e.target.id, {value: !this.state.settings[e.target.id]})});
  }

  render() {
    return (
      <div className="container">
        <div className="chessboard">
          <h2>en passant</h2>
          <BoardView
            board={this.state.board}
            style={this.state.style}
            handleSquareClick={this.handleSquareClick}
            settings={this.state.settings}
          />
        </div>
        <div className="rightBar">
          <div className="settings">
            <div className="gear" onClick={this.showSettings}>
              <img src="images/settings.png" alt="settings" height="20" width="20" />
            </div>
            <div id="settings-menu">
              <label><input type="checkbox" id="flipped" onClick={this.toggleSettings} />Flip board</label>
              <label><input type="checkbox" id="paths" onClick={this.toggleSettings} defaultChecked />Show paths</label>
              <label><input type="checkbox" id="moves" onClick={this.toggleSettings} />Show history</label>
            </div>
          </div>
          {this.state.settings.moves ? <MovesView moves={this.state.moves} /> : ''}
        </div>
      </div>
    );
  }
}

export default App