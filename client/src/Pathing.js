export const findPaths = (row, col, board, style) => {
  if (board[row][col][0] === 'p') {
      pawnPaths(row, col, board, style);
    } else if (board[row][col][0] === 'R') {
      rookPaths(row, col, board, style);
    } else if (board[row][col][0] === 'N') {
      knightPaths(row, col, board, style);
    } else if (board[row][col][0] === 'B') {
      bishopPaths(row, col, board, style);
    } else if (board[row][col][0] === 'Q') {
      queenPaths(row, col, board, style);
    } else if (board[row][col][0] === 'K') {
      kingPaths(row, col, board, style);
    }
}

// TODO: en passant
const pawnPaths = (row, col, board, style) => {
  if (board[row][col] === 'pl') {
    if (board[row - 1][col] === '') {
      style[row - 1][col] = '*';
      row === 6 && board[row - 2][col] === '' ? style[row - 2][col] = '*' : false;
    }
    // pawn capture
    board[row - 1][col - 1] && board[row - 1][col - 1] !== '' && board[row - 1][col - 1][1] !== 'l' ? style[row - 1][col - 1] = '!' : false;
    board[row - 1][col + 1] && board[row - 1][col + 1] !== '' && board[row - 1][col + 1][1] !== 'l' ? style[row - 1][col + 1] = '!' : false;
  } else {  // Black pawns
    if (board[row + 1][col] === '') {
      style[row + 1][col] = '*';
      row === 1 && board[row + 2][col] === '' ? style[row + 2][col] = '*' : false;
    }
    // pawn capture
    board[row + 1][col - 1] && board[row + 1][col - 1] !== '' && board[row - 1][col - 1][1] !== 'd' ? style[row + 1][col - 1] = '!' : false;
    board[row + 1][col + 1] && board[row + 1][col + 1] !== '' && board[row - 1][col + 1][1] !== 'd' ? style[row + 1][col + 1] = '!' : false;
  }
}

const rookPaths = (row, col, board, style) => {
  let color = board[row][col][1];

  for (let r = row + 1; r < 8; r++) {
    if (board[r][col] === '') {
      style[r][col] = '*';
    } else {
      board[r][col][1] !== color ? style[r][col] = '!' : false;
      break;
    }
  }
  for (let r = row - 1; r >= 0; r--) {
    if (board[r][col] === '') {
      style[r][col] = '*';
    } else {
      board[r][col][1] !== color ? style[r][col] = '!' : false;
      break;
    }
  }
  for (let c = col + 1; c < 8; c++) {
    if (board[row][c] === '') {
      style[row][c] = '*';
    } else {
      board[row][c][1] !== color ? style[row][c] = '!' : false;
      break;
    }
  }
  for (let c = col - 1; c >= 0; c--) {
    if (board[row][c] === '') {
      style[row][c] = '*';
    } else {
      board[row][c][1] !== color ? style[row][c] = '!' : false;
      break;
    }
  }
}

const knightPaths = (row, col, board, style) => {
  let color = board[row][col][1];

  board[row + 2] !== undefined && board[row + 2][col - 1] !== undefined ? (board[row + 2][col - 1] === '' ? style[row + 2][col - 1] = '*' : (board[row + 2][col - 1] && board[row + 2][col - 1][1] !== color ? style[row + 2][col - 1] = '!' : false)) : false;
  board[row + 2] !== undefined && board[row + 2][col + 1] !== undefined ? (board[row + 2][col + 1] === '' ? style[row + 2][col + 1] = '*' : (board[row + 2][col + 1] && board[row + 2][col + 1][1] !== color ? style[row + 2][col + 1] = '!' : false)) : false;
  board[row - 2] !== undefined && board[row - 2][col - 1] !== undefined ? (board[row - 2][col - 1] === '' ? style[row - 2][col - 1] = '*' : (board[row - 2][col - 1] && board[row - 2][col - 1][1] !== color ? style[row - 2][col - 1] = '!' : false)) : false;
  board[row - 2] !== undefined && board[row - 2][col + 1] !== undefined ? (board[row - 2][col + 1] === '' ? style[row - 2][col + 1] = '*' : (board[row - 2][col + 1] && board[row - 2][col + 1][1] !== color ? style[row - 2][col + 1] = '!' : false)) : false;
  board[row + 1] !== undefined && board[row + 1][col + 2] !== undefined ? (board[row + 1][col + 2] === '' ? style[row + 1][col + 2] = '*' : (board[row + 1][col + 2] && board[row + 1][col + 2][1] !== color ? style[row + 1][col + 2] = '!' : false)) : false;
  board[row - 1] !== undefined && board[row - 1][col + 2] !== undefined ? (board[row - 1][col + 2] === '' ? style[row - 1][col + 2] = '*' : (board[row - 1][col + 2] && board[row - 1][col + 2][1] !== color ? style[row - 1][col + 2] = '!' : false)) : false;
  board[row + 1] !== undefined && board[row + 1][col - 2] !== undefined ? (board[row + 1][col - 2] === '' ? style[row + 1][col - 2] = '*' : (board[row + 1][col - 2] && board[row + 1][col - 2][1] !== color ? style[row + 1][col - 2] = '!' : false)) : false;
  board[row - 1] !== undefined && board[row - 1][col - 2] !== undefined ? (board[row - 1][col - 2] === '' ? style[row - 1][col - 2] = '*' : (board[row - 1][col - 2] && board[row - 1][col - 2][1] !== color ? style[row - 1][col - 2] = '!' : false)) : false;
}

const bishopPaths = (row, col, board, style) => {
  let color = board[row][col][1];

  for (let r = row + 1, c = col + 1; r < 8 && c < 8; r++, c++) {
    if (board[r][c] === '') {
      style[r][c] = '*';
    } else {
      board[r][c][1] !== color ? style[r][c] = '!' : false;
      break;
    }
  }
  for (let r = row + 1, c = col - 1; r < 8 && c >= 0; r++, c--) {
    if (board[r][c] === '') {
      style[r][c] = '*';
    } else {
      board[r][c][1] !== color ? style[r][c] = '!' : false;
      break;
    }
  }
  for (let r = row - 1, c = col + 1; r >= 0 && c < 8; r--, c++) {
    if (board[r][c] === '') {
      style[r][c] = '*';
    } else {
      board[r][c][1] !== color ? style[r][c] = '!' : false;
      break;
    }
  }
  for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
    if (board[r][c] === '') {
      style[r][c] = '*';
    } else {
      board[r][c][1] !== color ? style[r][c] = '!' : false;
      break;
    }
  }
}

const queenPaths = (row, col, board, style) => {
  rookPaths(row, col, board, style);
  bishopPaths(row, col, board, style);
}

const kingPaths = (row, col, board, style) => {
  let color = board[row][col][1];

  board[row + 1] !== undefined && board[row + 1][col + 1] !== undefined ? (board[row + 1][col + 1] === '' ? style[row + 1][col + 1] = '*' : (board[row + 1][col + 1][1] !== color ? style[row + 1][col + 1] = '!' : false)) : false;
  board[row + 1] !== undefined && board[row + 1][col]     !== undefined ? (board[row + 1][col]     === '' ? style[row + 1][col]     = '*' : (board[row + 1][col][1]     !== color ? style[row + 1][col]     = '!' : false)) : false;
  board[row + 1] !== undefined && board[row + 1][col - 1] !== undefined ? (board[row + 1][col - 1] === '' ? style[row + 1][col - 1] = '*' : (board[row + 1][col - 1][1] !== color ? style[row + 1][col - 1] = '!' : false)) : false;
                                  board[row][col + 1]     !== undefined ? (board[row][col + 1]     === '' ? style[row][col + 1]     = '*' : (board[row][col + 1][1]     !== color ? style[row][col + 1]     = '!' : false)) : false;
                                  board[row][col - 1]     !== undefined ? (board[row][col - 1]     === '' ? style[row][col - 1]     = '*' : (board[row][col - 1][1]     !== color ? style[row][col - 1]     = '!' : false)) : false;
  board[row - 1] !== undefined && board[row - 1][col + 1] !== undefined ? (board[row - 1][col + 1] === '' ? style[row - 1][col + 1] = '*' : (board[row - 1][col + 1][1] !== color ? style[row - 1][col + 1] = '!' : false)) : false;
  board[row - 1] !== undefined && board[row - 1][col]     !== undefined ? (board[row - 1][col]     === '' ? style[row - 1][col]     = '*' : (board[row - 1][col][1]     !== color ? style[row - 1][col]     = '!' : false)) : false;
  board[row - 1] !== undefined && board[row - 1][col - 1] !== undefined ? (board[row - 1][col - 1] === '' ? style[row - 1][col - 1] = '*' : (board[row - 1][col - 1][1] !== color ? style[row - 1][col - 1] = '!' : false)) : false;

}