import React from 'react'
import RowView from './RowView.jsx'

const BoardView = ({board}) => (
  <div className="board">
    <table id="chessboard">
      <tbody>
        {board.map((row, key) => <RowView row={row} rowId={8 - key} key={key} />)}
      </tbody>
    </table>
  </div>
)

export default BoardView