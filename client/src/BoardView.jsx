import React from 'react'
import RowView from './RowView.jsx'

const BoardView = ({board, style, handleSquareClick}) => (
  <div className="board">
    <table id="chessboard">
      <tbody>
        {board.map((row, key) => <RowView row={row} style={style[key]} rowId={8 - key} handleSquareClick={handleSquareClick} key={key} />)}
      </tbody>
    </table>
  </div>
)

export default BoardView