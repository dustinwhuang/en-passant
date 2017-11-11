import React from 'react'
import SquareView from './SquareView.jsx'

const RowView = ({row, rowId, handleSquareClick}) => (
  <tr className={rowId}>
    {row.map((square, key) => <SquareView
      square={square}
      squareId={String.fromCharCode('a'.charCodeAt()  + key)} 
      rowId={rowId}
      handleSquareClick={handleSquareClick}
      key={key}
      />)}
  </tr>
)

export default RowView