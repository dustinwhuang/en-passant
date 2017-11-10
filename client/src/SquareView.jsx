import React from 'react'

const SquareView = ({square, squareId, rowId}) => (
  <td className={`${squareId}${rowId}`}
    style={(squareId.charCodeAt() + rowId) % 2 === 0 ? {backgroundColor: 'lightGrey'} : {} }
  >
    <img src={square !== '' ? `images/${square}.png` : ""} alt={square} height="40" width="40" />
  </td>
)

export default SquareView