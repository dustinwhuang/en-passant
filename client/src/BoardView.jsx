import React from 'react'
import SquareView from './SquareView.jsx'

const BoardView = (props) => (
  <div className="board">
    <table id="chessboard">
      <tbody>
        {renderBoard(props)}
      </tbody>
    </table>
  </div>
)

const renderBoard = ({board, style, handleSquareClick, flipped}) => {
  if (flipped) {
    return board.reduceRight((m, row, rowId) => m.concat(
      <tr className={rowId} key={rowId}>
        {row.reduceRight((m, square, key) => m.concat(<SquareView
          square={square}
          style={style[key]}
          squareId={String.fromCharCode('a'.charCodeAt()  + key)} 
          rowId={rowId}
          handleSquareClick={handleSquareClick}
          key={key}
          />), [])}
      </tr>), []
    );
  } else {
    return board.map((row, rowId) => (
      <tr className={rowId} key={rowId}>
        {row.map((square, key) => <SquareView
          square={square}
          style={style[key]}
          squareId={String.fromCharCode('a'.charCodeAt()  + key)} 
          rowId={rowId}
          handleSquareClick={handleSquareClick}
          key={key}
          />)}
      </tr>)
    );
  }
}

export default BoardView