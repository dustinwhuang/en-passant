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