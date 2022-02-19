scores = {
  x: -1,
  o: 1,
  tie: 0
}

function aiMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (isLegal(i, j)) {
        board[i][j] = ai;
        let score = minimax(board, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = {i, j};
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  // console.log(board);
}

function minimax(board, isMax) {
  let result = checkWin();
  if (result) {
    let score = scores[result];
    return score;
  }

  if (isMax) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (isLegal(i, j)) {
          board[i][j] = ai;
          let score = minimax(board, false);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = {i, j};
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (isLegal(i, j)) {
          board[i][j] = human;
          let score = minimax(board, true);
          board[i][j] = '';
          if (score < bestScore) {
            bestScore = score;
            move = {i, j};
          }
        }
      }
    }
    return bestScore;
  }
}