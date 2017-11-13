import React from 'react'

const MovesView = ({moves}) => (
  <div className="moves">
    <select multiple>
      {renderMoves(moves)}
    </select>
  </div>
)

const renderMoves = (moves) => {
  let moveList = [];

  for (let i = 0; i < moves.length; i += 2) {
    moveList.push(<option value={i / 2 + 1} key={i}>{`${i / 2 + 1}. ${moves[i]} ${moves[i + 1] ? moves[i + 1] : ''}`}</option>);
  }

  return moveList;
}

export default MovesView