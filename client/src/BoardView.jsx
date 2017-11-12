import React from 'react'
import SquareView from './SquareView.jsx'

const BoardView = ({board, style, handleSquareClick}) => (
  <div className="board">
    <table id="chessboard">
      <tbody>
        {board.map((row, rowId) => (
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
        )}
      </tbody>
    </table>
  </div>
)

export default BoardView