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
              ['', '', '', '', '', '', '', '']]
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