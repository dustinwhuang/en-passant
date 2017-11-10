import React from 'react'

const SquareView = ({square, squareId, rowId}) => (
  <td className={`${squareId}${rowId}`}
    style={(squareId.charCodeAt() + rowId) % 2 === 0 ? {backgroundColor: 'lightGrey'} : {} }
  >
    {square}
  </td>
)

export default SquareView